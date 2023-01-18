import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  constructor(
    private utils: UtilsService
    ) { }
  tipo:any;

  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  ngtipo = 'ejecutiva';
  back = 'background1';
  img:string;
  btn:string;
  user = {
    tipo: true
  };
  ngOnInit() {
  }
  radioChecked(val){
    this.tipo = val;
    if(this.tipo==1){
      //enviar pedido
    }else if(this.tipo==2){
      //tarjeta
      this.utils.navigate('tarjeta');
    }else{
      //oxxo
      this.utils.navigate('oxxo');
    }
  }
}
