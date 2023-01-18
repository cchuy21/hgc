import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-glosario',
  templateUrl: './glosario.page.html',
  styleUrls: ['./glosario.page.scss'],
})
export class GlosarioPage implements OnInit {
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  img:string;
  btn:string;
  glosarios:any;
  user = {
    tipo: 1
  };
  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private api: ApiService,
    private authService: AuthenticationService,
    private iab: InAppBrowser,
    private scree: ScreenOrientation

  ) { }
  map = null;
  map2 = null;
  ngtipo = 'ejecutiva';

  async ngOnInit() {

  }
  async ionViewWillEnter() {
    this.user =  JSON.parse(await this.storage.get('user'));
    if(this.user.tipo==1){
      this.img = this.img1;
      this.back = 'background1';
      this.ngtipo = 'ejecutiva';
      this.cargar();
    }else if(this.user.tipo==0){
      this.img = this.img2;
      this.back = 'background2';
      this.ngtipo = 'deportiva';
      this.cargar2();

    }else if(this.user.tipo==2){
      this.img = this.img3;
      this.back = 'background3';
      this.ngtipo = 'rosa';
      this.cargar3();

    }
  }
  navigate(page){
    this.utils.navigate(page);
  }
  private cargar(){
    this.api.get('glosario.php?tipo=1',{}).then(async data =>{
      this.glosarios = data;
      console.log(this.glosarios);
    }).catch(err => {
      console.log(err);
    });
  }
  private cargar2(){
    this.api.get('glosario.php?tipo=2',{}).then(async data =>{
      this.glosarios = data;
      console.log(this.glosarios);
    }).catch(err => {
      console.log(err);
    });
  }
  private cargar3(){
    this.api.get('glosario.php?tipo=3',{}).then(async data =>{
      this.glosarios = data;
      console.log(this.glosarios);
    }).catch(err => {
      console.log(err);
    });
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
  }
  letra(c){
    this.authService.c+=c;
    console.log(c);
    for(let i=1; i<=31; i++){
      let t = (i+this.authService.c);
      document.documentElement.style.setProperty('--pt'+i, t+"pt");
    }
  }
  abrirlink(lnk){
    const browser2 = this.iab.create(lnk,'_self', 'location=no');
  }
  abrirlibro() {
    const browser = this.iab.create('https://api.hgc.onishs.com/administrador/libro/turnjs4/samples/basic2/index7.php','_self', 'location=no');
    browser.on('loadstop').subscribe(event => {
      this.scree.lock(this.scree.ORIENTATIONS.LANDSCAPE);
    });
    browser.on('exit').subscribe(event => {
      this.scree.lock(this.scree.ORIENTATIONS.PORTRAIT);
      this.scree.unlock();
    });
  }
}
