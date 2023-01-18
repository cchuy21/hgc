import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  img:string;
  btn:string;
  user = {
    tipo: 1,
    nivel: 1
  };
  log = 1;
  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private authService: AuthenticationService,
    private iab: InAppBrowser,
    private scree: ScreenOrientation

  ) { }
  
  async ngOnInit() {

  }
  async ionViewWillEnter() {
    await this.storage.get('user').then( data => {
      if( data ){
        this.user =  JSON.parse(data);
        this.log = this.user.nivel;
      }else{
        this.log = 0;
        this.user = { tipo : 1,nivel : 1 };
      }
    }).catch(() => {
    });
    if(this.user.tipo==1){
      this.img = this.img1;
      this.back = 'background1';
    }else if(this.user.tipo==0){
      this.img = this.img2;
      this.back = 'background2';
    }else if(this.user.tipo==2){
      this.img = this.img3;
      this.back = 'background3';
    }
  }
  navigate(page){
    this.utils.navigate(page);
  }
  navigate2(page: string): void {
    if(page == 'favoritos'){
      this.storage.set('producto', 0);
      console.log('entro');
    }
    this.utils.navigate(page);
  }
  logout() {
    this.authService.logout(this.user);
    this.storage.clear().then(() => {
      this.user = {
        tipo: 1,
        nivel: 1
      };
      this.ionViewWillEnter();
    }).catch(() => {
      this.utils.toastPresent('Ocurrió un error al cerrar sesión. Intenta más tarde');
    });
  }
  letra(c){
    this.authService.c+=c;
    for(let i=1; i<=31; i++){
      let t = (i+this.authService.c);
      document.documentElement.style.setProperty('--pt'+i, t+"pt");
    }
  }
  abrirlibro() {
    const browser = this.iab.create('https://api.hgc.onishs.com/administrador/libro/turnjs4/samples/basic/index7.php','_self', 'location=no');
    browser.on('loadstop').subscribe(event => {
      this.scree.lock(this.scree.ORIENTATIONS.LANDSCAPE);
    });
    browser.on('exit').subscribe(event => {
      this.scree.lock(this.scree.ORIENTATIONS.PORTRAIT);
      this.scree.unlock();
    });
  }
}
