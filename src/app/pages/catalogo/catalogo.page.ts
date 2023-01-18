import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  img:string;
  btn:string;
  categorias:any;
  user = {
    tipo: 1
  };
  ngtipo = 'ejecutiva';
  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private api: ApiService,
    private authService: AuthenticationService,
    private iab: InAppBrowser,
    private scree: ScreenOrientation

  ) { }
  async ngOnInit() {

  }
  async ionViewWillEnter() {
    this.user =  JSON.parse(await this.storage.get('user'));
    if(this.user.tipo==1){
      this.img = this.img1;
      this.back = 'background1';
      this.ngtipo = 'ejecutiva';
      this.api.get('categorias.php',{}).then(async data =>{
        this.categorias = data;
        let c = 0;
        for(let d in this.categorias){
          this.categorias[d].class = "eje" + c;
          this.categorias[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c = 0;
          }
        }
      }).catch(err => {
        console.log("error",err);
        this.utils.toastPresent("Error al conectarse intente más tarde");
      });
    }else if(this.user.tipo==0){
      this.img = this.img2;
      this.back = 'background2';
      this.ngtipo = 'deportiva';
      this.api.get('categorias.php',{}).then(async data =>{
        this.categorias = data;
        let c = 0;
        for(let d in this.categorias){
          this.categorias[d].class = "dep" + c;
          this.categorias[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c=0;
          }
        }
      }).catch(err => {
        console.log("error",err);
        this.utils.toastPresent("Error al conectarse intente más tarde");
      });
    }else if(this.user.tipo==2){
      this.img = this.img3;
      this.back = 'background3';
      this.ngtipo = 'rosa';
      this.api.get('categorias.php',{}).then(async data =>{
        this.categorias = data;
        let c = 0;
        for(let d in this.categorias){
          this.categorias[d].class = "ros" + c;
          this.categorias[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c=0;
          }
        }
      }).catch(err => {
        console.log("error",err);
        this.utils.toastPresent("Error al conectarse intente más tarde");
      });
    }
    //this.categorias = JSON.parse('[{"id":"1","nombre":"Belleza de la piel","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCOLAGENOCAPSULAS.png"},{"id":"2","nombre":"Belleza del cabello","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFPELICURECAPSULAS.png"},{"id":"3","nombre":"Metabolismo corporal","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFESBELDERFEMCAPSULAS.png"},{"id":"4","nombre":"Nutrici\u00f3n deportistas ","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFESBELDERSPORTCAPS.png"},{"id":"5","nombre":"Multivitaminicos","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFBEETAMINCAPS.png"},{"id":"6","nombre":"Huesos\/Articulaciones","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCALSTRICCAPSULAS.png"},{"id":"7","nombre":"Sistema Inmunol\u00f3gico","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFONCOCARE.png"},{"id":"8","nombre":"Sistema Circulatorio","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFLINFATONICCAPS.png"},{"id":"9","nombre":"Sistema Biliar","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFHEPALIMP.png"},{"id":"10","nombre":"Sistema Digestivo","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCLEANMINTCAPS.png"},{"id":"11","nombre":"Sistema End\u00f3crino","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFAMOZOC.png"},{"id":"12","nombre":"Sistema Nervioso","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFNERVEST.png"},{"id":"13","nombre":"Sistema Reproductor Femenino","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFFLAVOFEM.png"},{"id":"14","nombre":"Sistema Reproductor Masculino","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFMAXIPRO.png"},{"id":"15","nombre":"Sistema Urinario","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFDRENALL.png"},{"id":"16","nombre":"Sistema Respiratorio","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFTOSYRUPJARABE.png"},{"id":"17","nombre":"Omegas","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFOMEGA.png"}]');
    //console.log(this.categorias);
  }
  navigate(page, id){
    this.storage.set('producto', id);
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
  }
  letra(c){
    this.authService.c+=c;
    console.log(c);
    for(let i=1; i<=31; i++){
      let t = (i+this.authService.c);
      document.documentElement.style.setProperty('--pt'+i, t+"pt");
    }
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
