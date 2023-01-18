import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { RecoverycodePage } from '../recoverycode/recoverycode.page';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  de = 1;
  img1 = '../../assets/images/HGC_LOGOEJEC.png';
  img2 = '../../assets/images/logo.png';
  img3 = '../../assets/images/HGC_RINICIOLOGOTIPO.png';

  showe = false;
  showd = true;
  showr = true;

  back = 'background1';
  img:string;
  btn:string;
  codigo:any;
  user:any;

  constructor(
    private modalctrl:ModalController,
    private api: ApiService,
    private utils: UtilsService,
    private storage: StorageService,
    private auth: AuthenticationService
  ) { }

  async ngOnInit() {

  }
  navigate(page){
    this.utils.navigate(page);
  }
  async ionViewWillEnter() {
    this.img = this.img1;

    this.codigo = '';
  }
  cambiare(){
    this.showe = false;
    this.showd = true;
    this.showr = true;
    this.img = this.img1;
    this.back = 'background1';
    this.de = 1;
  }
  cambiard(){
    this.showe = true;
    this.showd = false;
    this.showr = true;
    this.img = this.img2;
    this.back = 'background2';
    this.de = 0;
  }
  cambiarr(){
    this.showe = true;
    this.showd = true;
    this.showr = false;
    this.img = this.img3;
    this.back = 'background3';
    this.de = 2;
  }
  login(){
    this.api.post('login.php',{user:this.codigo}).then(async data =>{
      if(data != null){
        this.user = data[0];
        this.user.tipo = this.de;
        console.log(this.user);
        if(this.user.favoritos == ""){
          this.user.favoritos = [];
        }else{
          this.user.favoritos = JSON.parse(this.user.favoritos);
        }
        if(this.user.carrito == ""){
          this.user.carrito = [];
        }else{
          this.user.carrito = JSON.parse(this.user.carrito);
        }
        console.log(this.user);
        await this.storage.setSorage("user",this.user);
        await this.utils.toastPresent("Bienvenid@ "+ this.user.nombre);
        this.auth.authState.next(true);
        await this.utils.navigater('inicio');
      }else{
        this.utils.toastPresent("Error al conectarse, intente más tarde o con otro código");
      }
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });
    //this.http.post(environment.api + 'DatosEntidad/api/datosentidad', this.mainobj, {}).then(async data => {
    //}
  }
  async recovery(){
    const modal = await this.modalctrl.create({
      component: RecoverycodePage,
    });
    await modal.present();
  }
}
