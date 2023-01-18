import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-comocodigo',
  templateUrl: './comocodigo.page.html',
  styleUrls: ['./comocodigo.page.scss'],
})
export class ComocodigoPage implements OnInit {
  email:any;
  back = 'background1';

  constructor(
    private api: ApiService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
  }
  enviar(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(this.email)) {
        alert("error de formato de email");
    } else {
      this.api.post('conseguircodigo.php', {email:this.email}).then(async data =>{
        if(data==1){
          //this.utils.toastPresent("Se ha borrado de tu carrito");
          alert("Se ha mandado su solicitud, para más información visita http://www.hgc.mx/");
          this.utils.navigater('inicio');
        } 
      }).catch(err => {
        console.log("error",err);
        this.utils.toastPresent("Error al conectarse intente más tarde");
      });
    }
  }
}
