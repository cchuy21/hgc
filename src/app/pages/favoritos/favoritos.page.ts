import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  prod: any = [];
  id:any;
  information = null;
  img:string;
  user = {
    tipo: 1,
    id:0
  };
  ngtipo = 'ejecutiva';
  favoritos:any;
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  btn:string;
  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private api: ApiService,
    private authService: AuthenticationService

      ) { }

  async ngOnInit() {

  }
  async ionViewWillEnter() {
    this.user =  JSON.parse(await this.storage.get('user'));
    this.api.get('favoritos.php?id=' + this.user.id, {}).then(async data =>{
      this.favoritos = data;
      console.log(data);
      if(this.user.tipo==1){
        this.img = this.img1;
        this.back = 'background1';
        let c = 0;
        for(let d in this.favoritos){
          this.favoritos[d].class = "eje" + c;
          this.favoritos[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c=0;
          }
        }
        this.ngtipo = 'ejecutiva';
      }else if(this.user.tipo==0){
        this.ngtipo = 'deportiva';
        this.img = this.img2;
        this.back = 'background2';
        let c = 0;
        for(let d in this.favoritos){
          this.favoritos[d].class = "dep" + c;
          this.favoritos[d].class2 = "rowimg" + c;
  
          c++;
          if(c==2){
            c=0;
          }
        }
      }else if(this.user.tipo==2){
        this.ngtipo = 'rosa';
        this.img = this.img3;
        this.back = 'background3';
        let c = 0;
        for(let d in this.favoritos){
          this.favoritos[d].class = "ros" + c;
          this.favoritos[d].class2 = "rowimg" + c;
  
          c++;
          if(c==2){
            c=0;
          }
        }
      }
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });

  }
  navigate(page, id){
    this.storage.set('detalles', id);
    this.storage.set('ventana', 'favoritos');
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
}
