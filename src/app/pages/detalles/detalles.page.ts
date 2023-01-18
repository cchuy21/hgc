import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from './../../services/authentication/authentication.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  prod: any = [];
  id:any;
  information = null;
  pg = 'productos';
  img:string;
  user = {
    tipo: 1,
    favoritos: [],
    id:0,
    carrito: []
  };
  favo = [];
  fav = false;
  detalles:any;
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  btn:string;
  pro:any;
  cantidad = 1;
  constructor(
    private storage: Storage,
    private stra: StorageService,
    private utils: UtilsService,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private authService: AuthenticationService

  ) { }

  async ngOnInit() {

  } 

  async ionViewWillEnter() {
    this.cantidad = 1;
    this.user =  JSON.parse(await this.storage.get('user'));
    this.id =  JSON.parse(await this.storage.get('detalles'));
    this.pg =  await this.storage.get('ventana');
    console.log(this.pro);
    this.pro =  JSON.parse(await this.storage.get('producto'));
    console.log(this.pg);
  
    console.log(this.id);
    for(let c in this.user.favoritos){
      if(this.user.favoritos[c] == this.id){
        this.fav = true;
        break;
      }
    } 
    
    //let data = JSON.parse('[{"id":"5","clave":"10015","id_category":"1","nombre":"COLAGENO CAPSULAS","precio_dis":"193.33","precio_public":"300","descripcion":"Es un excelente compuesto de plantas medicinales antis\u00e9pticas, nutritivas y regeneradores celulares; especialmente conjuntadas para eliminar infecciones principalmente cut\u00e1neas, como son: barros, espinillas o incluso acn\u00e9. Adem\u00e1s de aportar a la nutrici\u00f3n y belleza de t\u00fa piel. Entre sus m\u00faltiples beneficios esta el de disminuir el dolor, la inflamaci\u00f3n, el edema y la rigidez de la artritis reumatoide, la osteoartritis, la artritis juvenil y la gota, fortalece los huesos, las articulaciones y las u\u00f1as, mejora la firmeza de la piel y ayuda a cicatrizar las heridas adem\u00e1s apoya a bajar de peso.","ingredientes":"Col\u00e1geno Hidrolizado","presentacion":"60 c\u00e1psulas","uso_sugerido":"Tome de 1 a 2 c\u00e1psulas con los alimentos 2 veces al d\u00eda.","video":"https:\/\/www.youtube.com\/embed\/qEVP7nFfmMc","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCOLAGENOCAPSULAS.png","nombre_imagen":"HGC_CFCOLAGENOCAPSULAS.png"}]');
    this.api.get('details.php?id=' + this.id, {}).then(async data =>{
      if(data[0].video!=null){
        data[0].verv=true;
        data[0].video=this.sanitizer.bypassSecurityTrustResourceUrl(data[0].video);
      }else{
        data[0].verv=false;
      }

      this.detalles = data;
      console.log(data);
      if(this.user.tipo==1){
        this.img = this.img1;
        this.back = 'background1';
        let c = 0;
        for(let d in this.detalles){
          this.detalles[d].class = "eje" + c;
          this.detalles[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c=0;
          }
        }
      }else if(this.user.tipo==0){
        this.img = this.img2;
        this.back = 'background2';
        let c = 0;
        for(let d in this.detalles){
          this.detalles[d].class = "dep" + c;
          this.detalles[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c=0;
          }
        }
      }else if(this.user.tipo==2){
        this.img = this.img3;
        this.back = 'background3';
        let c = 0;
        for(let d in this.detalles){
          this.detalles[d].class = "ros" + c;
          this.detalles[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c=0;
          }
        }
      }

      if(this.user.tipo){
        
      }else{
        
      }
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });

  }
  navigate(page, id){
    this.storage.set('detalles', id);
    this.utils.navigate(page);
  }
  borrarf(){
    for(let c in this.user.favoritos){
      if(this.user.favoritos[c] == this.id){
        this.user.favoritos.splice(parseInt(c), 1 );
        break;
      }
      
    } 
    console.log(this.user);

    this.api.post('gfvoritos.php', {value: JSON.stringify(this.user.favoritos),id:this.user.id}).then(async data =>{
      if(data==1){
        this.utils.toastPresent("Se ha borrado a tus favoritos");
        this.fav = false;
        await this.stra.setSorage('user', this.user);
      }
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });
  }
  agregarf(){
    let v = 0;
    for(let c in this.user.favoritos){
      if(this.user.favoritos[c] == this.id){
        v++;
      }
    } 
    if(!v){
      this.user.favoritos.push(this.id);
    }
    console.log(this.user);
    this.api.post('gfvoritos.php', {value: JSON.stringify(this.user.favoritos),id:this.user.id}).then(async data =>{
      if(data==1){
        this.utils.toastPresent("Se ha agregado a tus favoritos");
        this.fav = true;

        await this.stra.setSorage('user', this.user);
      }
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });
  }
  agregar(){
    console.log("id:"+this.id + " cantidad:" + this.cantidad);
    this.user.carrito.push({id:this.id,cantidad:this.cantidad});
    this.api.post('carrito.php', {value: JSON.stringify(this.user.carrito),id:this.user.id}).then(async data =>{
      if(data==1){
        this.utils.toastPresent("Se ha agregado a tu carrito");
        await this.stra.setSorage('user', this.user);
      }
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
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
}