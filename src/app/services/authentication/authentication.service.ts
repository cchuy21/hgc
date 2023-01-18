import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { HTTP } from '@ionic-native/http/ngx';
import { Platform, NavController } from '@ionic/angular';

import { UtilsService } from '../utils/utils.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: any;
  authState = new BehaviorSubject(false);
  use: any;
  FCMToken: string;
  public c = 0;
  constructor(
    private http: HTTP,
    private platform: Platform,
    private utils: UtilsService,
    public navCtrl: NavController,
    public storage: Storage,
    public alertController: AlertController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });

    if (this.platform.is('cordova')) {
    }
  }
  login(user): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        const newUser = this.generateSHAFromLogin(user);
        // tslint:disable-next-line: max-line-length
        this.http.post(environment.api + 'Usuarios/api/Login?usuario=' + newUser.usuario + '&pass=' + newUser.pass, {}, {}).then(async data => {
          let response = JSON.parse(data.data);
          if (data.status === 200) {
            this.http.setHeader('*', 'Authorization', response.Token);
            this.http.get(environment.api + 'Usuarios/api/usuarios?usuario=' + newUser.usuario , {}, {}).then(async data2 => {
              const response2 = JSON.parse(data2.data);
              response2.Token = response.Token;
              this.http.get(environment.api + 'Roles/api/Roles?_id=' + response2.Rol , {}, {}).then(async data3 => {
                const responseroles = JSON.parse(data3.data);
                response2.Rolarray = responseroles;
                // this.menuobj = response2.ModulosRol.map( x => {
                //   return { name: x.Modulo };
                // });
              });
              await this.storage.set('user', JSON.stringify(response2));
              if (data2.status === 200) {
                 this.authState.next(true);
                 resolve(true);
              }
            }).catch(error => {
              console.log(JSON.stringify(error));
              if (error.status === 400) {
                response = JSON.parse(error.error);
                this.utils.toastPresent(response.Mensaje);
              } else if (error.status === 400) {
                this.utils.toastPresent('Sin autorización');
              } else if (error.status === 500) {
                this.utils.toastPresent('Error interno del servidor. Intente más tarde.');
              }
              reject(false);
            });
          } else {
            this.utils.toastPresent(response.Mensaje, 'Error');
            reject(false);
          }
        }).catch(error => {
          console.log(JSON.stringify(error));
          if (error.status === 400) {
            const response = JSON.parse(error.error);
            this.utils.toastPresent(response.Mensaje);
          } else if (error.status === 400) {
            this.utils.toastPresent('Sin autorización');
          } else if (error.status === 500) {
            this.utils.toastPresent('Error interno del servidor. Intente más tarde.');
          }
          reject(false);
        });
    });
  }

  logout(user) {
    this.http.post(environment.api + 'logout.php',{user:user.codigo}, {}).then(async data =>{
      if(data != null){
        this.authState.next(false);
      }else{
        this.utils.toastPresent("Error al conectarse, intente más tarde o con otro código");
      }
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });
  }

  async updateFCMToken(token) {
    // this.http.put(environment.api + 'actualizar/tokenfb', token, {});
  }
  async alertcerrar() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea Cerrar Sesión?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            //this.logout();
          }
        }
      ]
    });
    await alert.present();
  }
  private ifLoggedIn() {
    this.storage.get('user').then((response) => {
      if (response) {
        this.user = JSON.parse(response);
        this.authState.next(true);
        if (this.platform.is('cordova')) {
          this.http.setHeader('*', 'Authorization', this.user.Token);
        }
      }
    });
  }
  private generateSHAFromLogin(user) {
    const newUser = {
      usuario: user.Usuario,
      pass: user.password
      // pass: 'CA055499534BBF683D7B2A09B4FA52C3E2F8C1D68516307F55B8E6A4069F94C2'
    };
    return newUser;
  }
  async getmaq(datascan: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(environment.api + 'DatosEntidad/api/DatosEntidad?CodigoIdentificacion=' + datascan , {}, {}).then(async data2 => {
      // tslint:disable-next-line: no-shadowed-variable
      const response = JSON.parse(data2.data);
      return response;
    }).catch(error => {
      console.log(JSON.stringify(error));
      if (error.status === 400) {
        // tslint:disable-next-line: no-shadowed-variable
        const response = JSON.parse(error.error);
        this.utils.toastPresent(response.Mensaje);
      } else if (error.status === 401) {
        this.utils.toastPresent('Sin autorización');
        //this.logout();
      } else if (error.status === 500) {
        this.utils.toastPresent('Error interno del servidor. Intente más tarde.');
      }
      return null;
    });
  }
  private getUserFromResponse(response: string) {
    const loginResponse = JSON.parse(response);

    const user = {
      IdUsuario: loginResponse.IdUsuario,
      token: loginResponse.token,
      nombre: loginResponse.Mensaje,
      roles : loginResponse.roles
    };
    return user;
  }
}
