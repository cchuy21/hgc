import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';

declare var Conekta;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  prod: any = [];
  id:any;
  information = null;
  img:string;
  user = {
    tipo: 1,
    id: 0,
    carrito: []
  };
  productos:any;
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  btn:string;
  total:any;
  oxxo:any;
  tarjeta:any;

  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private api: ApiService,
    private str: StorageService,
    private authService: AuthenticationService

  ) { }

  async ngOnInit() {

  }
  async ionViewWillEnter() {
    this.cargar();
  }

  async cargar(){
    Conekta.setLanguage("es");
    Conekta.setPublicKey(this.api.api_key);
    this.total = 0;
    await this.storage.get('user').then( data2 => {
      this.user = JSON.parse(data2);
    // let data = JSON.parse('[{"id":"5","clave":"10015","id_category":"1","nombre":"COLAGENO CAPSULAS","precio_dis":"193.33","precio_public":"300","descripcion":"Es un excelente compuesto de plantas medicinales antis\u00e9pticas, nutritivas y regeneradores celulares; especialmente conjuntadas para eliminar infecciones principalmente cut\u00e1neas, como son: barros, espinillas o incluso acn\u00e9. Adem\u00e1s de aportar a la nutrici\u00f3n y belleza de t\u00fa piel. Entre sus m\u00faltiples beneficios esta el de disminuir el dolor, la inflamaci\u00f3n, el edema y la rigidez de la artritis reumatoide, la osteoartritis, la artritis juvenil y la gota, fortalece los huesos, las articulaciones y las u\u00f1as, mejora la firmeza de la piel y ayuda a cicatrizar las heridas adem\u00e1s apoya a bajar de peso.","ingredientes":"Col\u00e1geno Hidrolizado","presentacion":"60 c\u00e1psulas","uso_sugerido":"Tome de 1 a 2 c\u00e1psulas con los alimentos 2 veces al d\u00eda.","video":"https:\/\/www.youtube.com\/embed\/qEVP7nFfmMc","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCOLAGENOCAPSULAS.png","nombre_imagen":"HGC_CFCOLAGENOCAPSULAS.png","cantidad":3},{"id":"5","clave":"10015","id_category":"1","nombre":"COLAGENO CAPSULAS","precio_dis":"193.33","precio_public":"300","descripcion":"Es un excelente compuesto de plantas medicinales antis\u00e9pticas, nutritivas y regeneradores celulares; especialmente conjuntadas para eliminar infecciones principalmente cut\u00e1neas, como son: barros, espinillas o incluso acn\u00e9. Adem\u00e1s de aportar a la nutrici\u00f3n y belleza de t\u00fa piel. Entre sus m\u00faltiples beneficios esta el de disminuir el dolor, la inflamaci\u00f3n, el edema y la rigidez de la artritis reumatoide, la osteoartritis, la artritis juvenil y la gota, fortalece los huesos, las articulaciones y las u\u00f1as, mejora la firmeza de la piel y ayuda a cicatrizar las heridas adem\u00e1s apoya a bajar de peso.","ingredientes":"Col\u00e1geno Hidrolizado","presentacion":"60 c\u00e1psulas","uso_sugerido":"Tome de 1 a 2 c\u00e1psulas con los alimentos 2 veces al d\u00eda.","video":"https:\/\/www.youtube.com\/embed\/qEVP7nFfmMc","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCOLAGENOCAPSULAS.png","nombre_imagen":"HGC_CFCOLAGENOCAPSULAS.png","cantidad":3}]');
      this.api.get('getcarrito.php?id=' + this.user.id, {}).then(async data =>{
        this.productos = data;
        console.log(data);
        if(this.user.tipo==1){
          this.img = this.img1;
          this.back = 'background1';
          let c = 0;
          for(let d in this.productos){
            this.productos[d].class = "eje" + c;
            this.productos[d].class2 = "rowimg" + c;
            this.total += (this.productos[d].precio_dis*this.productos[d].cantidad);
            c++;
            if(c==2){
              c=0;
            }
          }
        }else if(this.user.tipo==0){
          this.img = this.img2;
          this.back = 'background2';
          let c = 0;
          for(let d in this.productos){
            this.productos[d].class = "dep" + c;
            this.productos[d].class2 = "rowimg" + c;
            c++;
            if(c==2){
              c=0;
            }
          }
        }else if(this.user.tipo==2){
          this.img = this.img3;
          this.back = 'background3';
          let c = 0;
          for(let d in this.productos){
            this.productos[d].class = "ros" + c;
            this.productos[d].class2 = "rowimg" + c;
            c++;
            if(c==2){
              c=0;
            }
          }
        }
        this.total = this.total.toFixed(2);
        this.extras();
      }).catch(err => {
          console.log("error",err);
        this.utils.toastPresent("Error al conectarse intente más tarde");
      });
    }).catch(() => {
    });
  }
  navigate(page, id){
    this.storage.set('detalles', id);
    this.utils.navigate(page);
  }
  
  enviarpedido(){
    console.log(this.user.id);
    this.api.post('pedido.php', {id:this.user.id}).then(async data =>{
      if(data==1){
        //this.utils.toastPresent("Se ha borrado de tu carrito");
        this.utils.toastPresent("Se ha recibido su pedido");
        this.user.carrito = [];
        await this.str.setSorage('user', this.user);
        this.utils.navigater('confirmacion');
      } 
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });
  }
  borrar(id){
    console.log(id);
    for(let c in this.productos){
      console.log(this.productos[c].id);
      if(this.productos[c].id==id){
        this.productos.splice(parseInt(c),1);
        break;
      }
    }
    let narr=[];
    for(let c in this.productos){
      narr.push({id:this.productos[c].id,cantidad:this.productos[c].cantidad});
    }
    this.user.carrito = narr;
    this.api.post('carrito.php', {value: JSON.stringify(narr),id:this.user.id}).then(async data =>{
      if(data==1){
        this.utils.toastPresent("Se ha borrado de tu carrito");
        await this.str.setSorage('user', this.user);
        this.cargar();
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
  agregar(valor, ind){
    this.productos[ind].cantidad += valor;
    if(this.productos[ind].cantidad < 1){
      this.productos[ind].cantidad=1;
    }
    this.user.carrito = this.productos;
    this.api.post2('carrito.php', {value: JSON.stringify(this.productos),id:this.user.id}).then(async data =>{
      if(data==1){
        await this.str.setSorage('user', this.user);
        this.cargar2();
      }
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });
  }
  async probar(){

  }
  
  async siguiente(){
    this.utils.navigate('opciones');
  }
  async cargar2(){
    this.total = 0;
      //let data = JSON.parse('[{"id":"5","clave":"10015","id_category":"1","nombre":"COLAGENO CAPSULAS","precio_dis":"193.33","precio_public":"300","descripcion":"Es un excelente compuesto de plantas medicinales antis\u00e9pticas, nutritivas y regeneradores celulares; especialmente conjuntadas para eliminar infecciones principalmente cut\u00e1neas, como son: barros, espinillas o incluso acn\u00e9. Adem\u00e1s de aportar a la nutrici\u00f3n y belleza de t\u00fa piel. Entre sus m\u00faltiples beneficios esta el de disminuir el dolor, la inflamaci\u00f3n, el edema y la rigidez de la artritis reumatoide, la osteoartritis, la artritis juvenil y la gota, fortalece los huesos, las articulaciones y las u\u00f1as, mejora la firmeza de la piel y ayuda a cicatrizar las heridas adem\u00e1s apoya a bajar de peso.","ingredientes":"Col\u00e1geno Hidrolizado","presentacion":"60 c\u00e1psulas","uso_sugerido":"Tome de 1 a 2 c\u00e1psulas con los alimentos 2 veces al d\u00eda.","video":"https:\/\/www.youtube.com\/embed\/qEVP7nFfmMc","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCOLAGENOCAPSULAS.png","nombre_imagen":"HGC_CFCOLAGENOCAPSULAS.png","cantidad":3},{"id":"5","clave":"10015","id_category":"1","nombre":"COLAGENO CAPSULAS","precio_dis":"193.33","precio_public":"300","descripcion":"Es un excelente compuesto de plantas medicinales antis\u00e9pticas, nutritivas y regeneradores celulares; especialmente conjuntadas para eliminar infecciones principalmente cut\u00e1neas, como son: barros, espinillas o incluso acn\u00e9. Adem\u00e1s de aportar a la nutrici\u00f3n y belleza de t\u00fa piel. Entre sus m\u00faltiples beneficios esta el de disminuir el dolor, la inflamaci\u00f3n, el edema y la rigidez de la artritis reumatoide, la osteoartritis, la artritis juvenil y la gota, fortalece los huesos, las articulaciones y las u\u00f1as, mejora la firmeza de la piel y ayuda a cicatrizar las heridas adem\u00e1s apoya a bajar de peso.","ingredientes":"Col\u00e1geno Hidrolizado","presentacion":"60 c\u00e1psulas","uso_sugerido":"Tome de 1 a 2 c\u00e1psulas con los alimentos 2 veces al d\u00eda.","video":"https:\/\/www.youtube.com\/embed\/qEVP7nFfmMc","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCOLAGENOCAPSULAS.png","nombre_imagen":"HGC_CFCOLAGENOCAPSULAS.png","cantidad":3}]');
      if(this.user.tipo){
        this.img = this.img1;
        this.back = 'background1';
        let c = 0;
        for(let d in this.productos){
          this.productos[d].class = "eje" + c;
          this.productos[d].class2 = "rowimg" + c;
          this.total += (this.productos[d].precio_dis*this.productos[d].cantidad);
          c++;
          if(c==2){
            c=0;
          }
        }
      }else{
        this.img = this.img2;
        this.back = 'background2';
        let c = 0;
        for(let d in this.productos){
          this.productos[d].class = "dep" + c;
          this.productos[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c=0;
          }
        }
      }
      this.total = this.total.toFixed(2);
      this.extras();
  }
  extras(){
    this.oxxo = (parseFloat(this.total) + (parseFloat(this.total) * 0.039)).toFixed(2);
    this.tarjeta = (parseFloat(this.total) + (parseFloat(this.total) * 0.029)).toFixed(2);
  }
}
