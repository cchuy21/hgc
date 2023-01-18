import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './../../services/authentication/authentication.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  img:string;
  btn:string;
  noticias:any;
  user = {
    tipo: 1,
    nivel: 1
  };
  log = 1;
  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private api: ApiService,
    private authService: AuthenticationService

  ) { }

  ngOnInit() {
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
      this.cargar();
    }else if(this.user.tipo==0){
      this.img = this.img2;
      this.back = 'background2';
      this.cargar2();
    }else if(this.user.tipo==2){
      this.img = this.img3;
      this.back = 'background3';
      this.cargar();
    }
  }
  navigate(page){
    this.utils.navigate(page);
  }
  private cargar(){
    this.api.get('noticias.php',{}).then(async data =>{
      this.noticias = data;
      console.log(this.noticias);
    }).catch(err => {
      console.log(err);
    });
  }
  private cargar2(){
    this.api.get('noticias.php',{}).then(async data =>{
      this.noticias = data;
      console.log(this.noticias);
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
    this.storage.clear().then(() => {
      this.user = {
        tipo: 1,
        nivel: 1      };
      this.ionViewWillEnter();
    }).catch(() => {
      this.utils.toastPresent('Ocurrió un error al cerrar sesión. Intenta más tarde');
    });
  }
  letra(c){
    this.authService.c+=c;
    console.log(c);
    for(let i=1; i<=31; i++){
      let t = (i+this.authService.c);
      document.documentElement.style.setProperty('--pt'+i, t+"pt");
    }
  }
}
