import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  prod: any = [];
  id:any;
  information = null;
  img:string;
  user = {
    tipo: 1
  };
  busqueda:any;
  glosario:any;
  salud:any;
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  btn:string;
  miBuscador:string;
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
  }
  navigate(page, id){
    this.storage.set('ventana', 'busqueda');
    this.storage.set('detalles', id);
    this.utils.navigate(page);
  }
  onInput(e){
    console.log(e);
  }
  onCancel(e){
    console.log(e);
  }
  buscar(){
    
      if(this.user.tipo==1){
        this.img = this.img1;
        this.back = 'background1';
        let c = 0;
        this.api.get('busqueda.php?id=' + this.miBuscador + '&tipo=1', {}).then(async data =>{
          this.busqueda = data['busqueda'];
          this.glosario = data['glosario'];
          this.salud = data['salud'];
          for(let d in this.busqueda){
            this.busqueda[d].class = "eje" + c;
            this.busqueda[d].class2 = "rowimg" + c;
            c++;
            if(c==2){
              c=0;
            }
          }
        }).catch(err => {
          console.log("error",err);
          this.utils.toastPresent("Error al conectarse intente más tarde");
        });
        
      }else if(this.user.tipo==0){
        this.img = this.img2;
        this.back = 'background2';
        let c = 0;
        this.api.get('busqueda.php?id=' + this.miBuscador + '&tipo=0', {}).then(async data =>{
          this.busqueda = data['busqueda'];
          this.glosario = data['glosario'];
          this.salud = data['salud'];
          for(let d in this.busqueda){
            this.busqueda[d].class = "dep" + c;
            this.busqueda[d].class2 = "rowimg" + c;
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
        let c = 0;
        this.api.get('busqueda.php?id=' + this.miBuscador + '&tipo=2', {}).then(async data =>{
          this.busqueda = data['busqueda'];
          this.glosario = data['glosario'];
          this.salud = data['salud'];
          for(let d in this.busqueda){
            this.busqueda[d].class = "ros" + c;
            this.busqueda[d].class2 = "rowimg" + c;
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
