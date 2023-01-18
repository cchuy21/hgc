import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  prod: any = [];
  id:any;
  information = null;
  img:string;
  user = {
    tipo: 1
  };
  ngtipo = 'ejecutiva';

  productos:any;
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
    this.id =  JSON.parse(await this.storage.get('producto'));
    console.log(this.id);
    //let data = JSON.parse('[{"id":"5","clave":"10015","id_category":"1","nombre":"COLAGENO CAPSULAS","precio_dis":"193.33","precio_public":"300","descripcion":"Es un excelente compuesto de plantas medicinales antis\u00e9pticas, nutritivas y regeneradores celulares; especialmente conjuntadas para eliminar infecciones principalmente cut\u00e1neas, como son: barros, espinillas o incluso acn\u00e9. Adem\u00e1s de aportar a la nutrici\u00f3n y belleza de t\u00fa piel. Entre sus m\u00faltiples beneficios esta el de disminuir el dolor, la inflamaci\u00f3n, el edema y la rigidez de la artritis reumatoide, la osteoartritis, la artritis juvenil y la gota, fortalece los huesos, las articulaciones y las u\u00f1as, mejora la firmeza de la piel y ayuda a cicatrizar las heridas adem\u00e1s apoya a bajar de peso.","ingredientes":"Col\u00e1geno Hidrolizado","presentacion":"60 c\u00e1psulas","uso_sugerido":"Tome de 1 a 2 c\u00e1psulas con los alimentos 2 veces al d\u00eda.","video":"https:\/\/www.youtube.com\/embed\/qEVP7nFfmMc","imagen":"http:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCOLAGENOCAPSULAS.png","nombre_imagen":"HGC_CFCOLAGENOCAPSULAS.png"},{"id":"44","clave":"10017","id_category":"1","nombre":"COLAGENO MALTEADA","precio_dis":"270","precio_public":"450","descripcion":"Por su combinaci\u00f3n de vitaminas, minerales y frutas, la malteada col\u00e1geno Mystical Visage, es una fuente de prote\u00edna y energ\u00eda que complementada con una alimentaci\u00f3n balanceada, te puede otorgar los nutrientes necesarios para llevar a cabo el ritmo de vida diaria. La combinaci\u00f3n de estos elementos con el col\u00e1genos hidrolizado, ayuda a prevenir el desgaste de articulaciones y fortalecer el sistema \u00f3seo, adem\u00e1s de ayudar a evitar el debilitamiento y la elasticidad de la piel y prevenir el envejecimiento prematuro.","ingredientes":"Calcio de coral, L-Carnitina, Noni, Goji, Mangost\u00e1n, Extracto de semilla de uva, Ar\u00e1ndano, Leche de soya, Prote\u00edna aislada de soya, Cocoa, Goma Xanthan, Avena, Col\u00e1geno Hidrolizado, Lecitina de soya y Estevia.","presentacion":"650 g","uso_sugerido":"Agregar 2 cucharadas en 250 ml de leche de soya, puede agregar fruta o avena y asi sustituir el desayuno o la cena o bien tomar como complemento de alimentaci\u00f3n en dosis mas peque\u00f1as de 1 a 3 veces al d\u00eda.","video":null,"imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFMALTEADACOLAGENO.png","nombre_imagen":"HGC_CFMALTEADACOLAGENO.png"},{"id":"71","clave":"10115","id_category":"1","nombre":"CREMA CORPORAL MYSTICAL VISAGE","precio_dis":"154.67","precio_public":"259","descripcion":"En el cuidado corporal, la medida m\u00e1s importante es el ba\u00f1o completo; el agua tibia relaja la piel y los m\u00fasculos y posibilita una acci\u00f3n m\u00e1s intensa de las diferentes sustancias adicionadas al ba\u00f1o. Tras el ba\u00f1o debe extenderse por todo el cuerpo una crema o un aceite corporal. En Mystical Visage Crema Corporal se han incorporado componentes rejuvenecedores y nutritivos para mantener una piel con aspecto juvenil y sobre todo brindarle a la piel suavidad, belleza y salud.","ingredientes":"Aceite de Almendras Dulces, Aceite de Germen de Trigo, Cola de Caballo, Manzanilla, Romero, Col\u00e1geno, Coenzima Q-10 y esencia de Gardenia.","presentacion":"500 g","uso_sugerido":"Apl\u00edquese uniformemente en todo el cuerpo, especialmente despu\u00e9s de la ducha y antes de acostarse. Puede aplicarse por la noche y de d\u00eda.","video":"https:\/\/www.youtube.com\/embed\/LJE4amAtD_g","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCREMACORPORAL.png","nombre_imagen":"HGC_CFCREMACORPORAL.png"},{"id":"72","clave":"10021","id_category":"1","nombre":"CREMA LIMPIADORA","precio_dis":"154.67","precio_public":"259","descripcion":"Gracias a sus ingredientes posee propiedades antis\u00e9pticas, fungicidas, antiacneicas, eliminadoras de c\u00e9lulas muertas, tiene un gran poder de penetraci\u00f3n en la piel. Es ideal para el cuidado Juvenil de la piel de cara, cuello y manos, o incluso puede ser usada para el cuidado de los pies.","ingredientes":"Aceite de rosa mosqueta, Aceite esencial de lavanda, aceite esencial de \u00e1rbol de t\u00e9, equinacea, cola de caballo, fenogreco, tepezcohuite, s\u00e1bila y arcilla volc\u00e1nica","presentacion":"60 g","uso_sugerido":"Con el rostro limpio aplicar por la noche con un suave masaje circular durante cinco minutos, esperar de 15 a 20 minutos y lavar con agua tibia y jab\u00f3n neutro.","video":"https:\/\/www.youtube.com\/embed\/RqtadKOU2Mk","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCREMALIMPIADORA.png","nombre_imagen":"HGC_CFCREMALIMPIADORA.png"},{"id":"76","clave":"10121","id_category":"1","nombre":"CREMA FACIAL DE COLAGENO","precio_dis":"193.33","precio_public":"295","descripcion":"El deterioro de la piel que se produce por causas naturales se presenta en forma de arrugas. Las arrugas son causadas por alteraciones f\u00edsico-qu\u00edmicas que conllevan al envejecimiento de la piel. A medida que pasa el tiempo se pierden gradualmente 3 elementos importantes para la piel: col\u00e1geno, la fibra prote\u00ednica que da firmeza a la piel lo que provoca que se vuelva mas delgada y d\u00e9bil; elastina, responsable de la elasticidad; glicosaminoglicanos, retentivos de la humedad. Por lo dem\u00e1s el sol, el humo de tabaco y de la contaminaci\u00f3n, pueden acelerar tambi\u00e9n el proceso. En Mystical Visage crema facial col\u00e1geno se han reunido ingredientes \u00fanicos de la naturaleza para favorecer una excelente nutrici\u00f3n facial y por ende para evitar el envejecimiento prematuro de la piel. Id\u00f3nea para cara, contorno de ojos, cuello y escote.","ingredientes":" Agua Purificada, Col\u00e1geno Hidrolizado, Aceite de Almendras dulces, Aceite de Rosa Mosqueta, Cola de Caballo y Filtro Solar.","presentacion":"60 g","uso_sugerido":"Aplicar despu\u00e9s del aseo facial, apl\u00edquese con un suave masaje circular. Puede aplicarse de noche y de d\u00eda.","video":"https:\/\/www.youtube.com\/embed\/9yh6d2N6URE","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCREMAFACIAL.png","nombre_imagen":"HGC_CFCREMAFACIAL.png"},{"id":"78","clave":"10016","id_category":"1","nombre":"COLAGENO CREMA CORPORAL","precio_dis":"193.33","precio_public":"295","descripcion":"La aparici\u00f3n de estr\u00edas ocurre generalmente en casos de obesidad en la pubertad, pero sobretodo en el embarazo. Se debe mantener la piel bien lubricada para evitarlas en un gran porcentaje. Mystical Visage Crema Corporal ha reunido componentes e ingredientes naturales excelentes para nutrir y proporcionar elasticidad y belleza a su piel.","ingredientes":"Agua Purificada, Col\u00e1geno Hidrolizado, Elastina, Aceite de jojoba, Almendras, Vit-E, Aceite de Semilla de Uva, Rosa Mosqueta, Germen de Trigo, Filtro Solar, Monoestearato de Glicerilo, \u00c1cido Este\u00e1rico, Extracto de Manzanilla, Romero, Cola de Caballo, Agua de Hamamelis y de Rosas, Glicerina, Carboximetilcelulosa y Metil.","presentacion":"150 ml","uso_sugerido":"Ideal para reducir el problema de estr\u00edas en el cuerpo. Basta con aplicar dando un masaje en forma circular en el \u00e1rea a tratar.","video":"https:\/\/www.youtube.com\/embed\/5uqqlJqwrrU","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFCREMACORPORALCOLAGENO.png","nombre_imagen":"HGC_CFCREMACORPORALCOLAGENO.png"},{"id":"82","clave":"10070","id_category":"1","nombre":"SALES ORG\u00c1NICAS","precio_dis":"290","precio_public":"480","descripcion":"Las sales contienen minerales que producen un efecto alcalinizante en el cuerpo, potencian la eliminaci\u00f3n de los desechos como \u00e1cidos de los m\u00fasculos y articulaciones, son excelentes en casos de enfermedades infecciosas,, reumatismo, artritis y ayudan a la relajaci\u00f3n. Incluso su uso regular reafirma zonas fl\u00e1cidas, tonifica tejidos y por ende mejora la textura de la piel.","ingredientes":"Sales de Epson, Aceite Esencial de \u00c1rbol de T\u00e9 y Aceite Esencial de Lavanda.","presentacion":"6 sobres de 100 g c\/u.","uso_sugerido":"A\u00f1ada 100g. (un sobre) del producto en medio litro de agua caliente, sumergir las vendas por un lapso de aproximadamente 5 minutos, exprimir levemente y poner en el \u00e1rea a tratar.","video":"https:\/\/www.youtube.com\/embed\/o19Qahc20T4","imagen":"https:\/\/api.hgc.onishs.com\/images\/productos\/HGC_CFSALESORGANICAS.png","nombre_imagen":"HGC_CFSALESORGANICAS.png"}]');
    this.api.get('productos.php?id=' + this.id, {}).then(async data =>{
      this.productos = data;
      console.log(data);
      if(this.user.tipo==1){
        this.img = this.img1;
        this.back = 'background1';
        this.ngtipo = 'ejecutiva';
        let c = 0;
        for(let d in this.productos){
          this.productos[d].class = "eje" + c;
          this.productos[d].class2 = "rowimg" + c;
          c++;
          if(c==2){
            c=0;
          }
        }
      }else if(this.user.tipo==0){
        this.img = this.img2;
        this.back = 'background2';
        this.ngtipo = 'deportiva';
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
        this.ngtipo = 'rosa';
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
      }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });

  }
  navigate(page, id){
    this.storage.set('detalles', id);
    this.storage.set('ventana', 'productos');
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
