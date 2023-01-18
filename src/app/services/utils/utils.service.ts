import { Injectable } from '@angular/core';


import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController, Platform, NavController } from '@ionic/angular';

import { MenuController } from '@ionic/angular';

import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private loading: any;
  constructor(
    private http: HTTP,
    private router: Router,
    private platform: Platform,
    private menu: MenuController,
    public navCtrl: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }
  
  async toastPresent(msg: string, headerStr?: string) {
    const toast = await this.toastController.create({
      header: headerStr ? headerStr : 'Notificación',
      message: msg,
      position: 'bottom',
      duration: 4000,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }
  async dismissLoader() {
    await this.loading.dismiss();
  }
  async presentLoader() {
    this.loading = await this.loadingController.create({
      message: 'Cargando',
      mode: 'ios',
      spinner: 'dots',
    });
    await this.loading.present();
  }
  navigate(route: string, obj1?, optionalData?, obj2?) {
    this.closemenu();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        body: JSON.stringify(obj1),
        optional: optionalData,
        obj: JSON.stringify(obj2),
      }
    };

    return this.navCtrl.navigateForward(route);
  }
  navigater(route: string, obj1?, optionalData?, obj2?) {
    this.closemenu();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        body: JSON.stringify(obj1),
        optional: optionalData,
        obj: JSON.stringify(obj2),
      }
    };
    // return this.router.navigate([route], navigationExtras);
    return this.navCtrl.navigateRoot(route);
  }

  async openmenu(menu) {
    this.menu.open(menu);
  }
  async closemenu() {
    this.menu.close('first');
    this.menu.close('sesion');
  }
}
