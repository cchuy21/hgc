import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage/storage.service';

declare var Conekta;

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {
  //2.9%
  years = [];
  tokenParams = {
    "card": {
      "number": "4242424242424242",
      "name": "Jose de jesus",
      "exp_year": "23",
      "exp_month": "04",
      "cvc": "123",
      "address": {
          "street1": "Jose maria morelos",
          "street2": "san antono de los horcones",
          "city": "jesus maria",
          "state": "aguascalientes",
          "zip": "20900",
          "country": "Mexico"
       }
    }
  };
  telef = '';
  img1 = '../../assets/images/HGC_LOGODORADO.png';
  img2 = '../../assets/images/HGC_FRONTLOGO.png';
  back = 'background1';
  img:string;
  btn:string;
  saluds:any;
  user = {
    tipo: 1,
    favoritos: [],
    id:0,
    carrito: []
  };
  ngtipo = 'ejecutiva';

  constructor(
    private api: ApiService,
    private utils: UtilsService,
    private storage: Storage,
    private str: StorageService

  ) {
    Conekta.setLanguage("es");
    Conekta.setPublicKey(this.api.api_key);
    console.log(this.api.api_key);
   }

  async ngOnInit() {
    alert('se cobra 2.9% extra sobre el total para el pago en tarjeta');
    this.user =  JSON.parse(await this.storage.get('user'));
    let an = new Date().getFullYear();
    for(let i = an; i <= (an+10); i++){
      this.years.push(''+i);
    }
  }
  validar() {
    console.log(this.tokenParams);
    let self = this;
    if(Conekta.card.validateNumber(this.tokenParams.card.number) && Conekta.card.validateExpirationDate(this.tokenParams.card.exp_month,this.tokenParams.card.exp_year) && Conekta.card.validateCVC(this.tokenParams.card.cvc)){
      Conekta.Token.create(this.tokenParams, (token)=>{
        self.sendtoken(token);
      }, this.errorResponseHandler);
    }else{
      alert('Por favor revise sus datos de la tarjeta para proceder con el pago');
    }
  }
  sendtoken(nuevot){
    this.api.postconek('tarjeta.php', {id:this.user.id, tkn:nuevot, direccion: this.tokenParams.card.address, telefono: this.telef}).then(async data =>{
      if(data==1){
        //this.utils.toastPresent("Se ha borrado de tu carrito");
        this.utils.toastPresent("Se ha recibido su pedido");
        this.user.carrito = [];
        await this.str.setSorage('user', this.user);
        this.utils.navigater('confirmacion');
        alert("Se ha recibido tu pago");

      } 
    }).catch(err => {
      console.log("error",err);
      this.utils.toastPresent("Error al conectarse intente más tarde");
    });
  }

  errorResponseHandler(error){
      alert('Por favor revise sus datos de la tarjeta para proceder con el pago');
  }
}
