import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UtilsService } from './services/utils/utils.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private statusBar: StatusBar,
    private api: ApiService,
    private utils: UtilsService,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private storage: Storage,
    private menu: MenuController

  ) {
    this.initializeApp();
  }
  usuario: any;
  ftr = true;
  bk = "backa";
  c = 0;
  initializeApp() {
    if(this.platform.is('cordova')){
      this.authService.authState.subscribe(async state => {
        state ? this.utils.navigater('inicio') : this.utils.navigater('login');
        if (state) {
          this.usuario =  await this.storage.get('user');
          this.usuario = JSON.parse(this.usuario);
          if(this.usuario.tipo){
            this.bk = "backa";
          }else{
            this.bk = "backv";
          }
          this.menu.enable(false, 'first');
        } else {
          await this.menu.close();
          this.menu.enable(true, 'first');
        }
      });
    } else {
      this.utils.navigater('comocodigo');
    }
  }
  navigate(page: string): void {
    if(page == 'favoritos'){
      this.storage.set('producto', 0);
      console.log('entro');
    }
    this.utils.navigate(page);
  }
  logout() {
    this.authService.logout(this.usuario);
  }
  letra(c){
    this.c+=c;
    console.log(c);
    for(let i=1; i<=31; i++){
      let t = (i+this.c);
      document.documentElement.style.setProperty('--pt'+i, t+"pt");
    }
  }
}
