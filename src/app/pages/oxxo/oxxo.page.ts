import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-oxxo',
  templateUrl: './oxxo.page.html',
  styleUrls: ['./oxxo.page.scss'],
})
export class OxxoPage implements OnInit {
 //3.9%
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';

  back = 'background1';
  img:string;
  btn:string;
  user = {
    tipo: 1,
    favoritos: [],
    id:0,
    carrito: [],
    email:'',
    nombre:''
  };
  nombre:string;
  telef:string;
  email:string;
  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private authService: AuthenticationService,
    private api: ApiService,
    private str: StorageService

  ) { }
  
  async ngOnInit() {
    alert('se cobra 3.9% extra sobre el total para el pago en oxxo');
    this.user =  JSON.parse(await this.storage.get('user'));
    this.email = this.user.email;
    this.nombre = this.user.nombre;
    this.telef = '';
    
  }
  async ionViewWillEnter() {
    this.user =  JSON.parse(await this.storage.get('user'));
    if(this.user.tipo==1){
      this.img = this.img1;
      this.back = 'background1';
    }else if(this.user.tipo==0){
      this.img = this.img2;
      this.back = 'background2';
    }else if(this.user.tipo==2){
      this.img = this.img3;
      this.back = 'background3';
    }
  }
  navigate(page){
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
  validar(){
    if(this.nombre !='' && this.telef.length == 10 && this.email != ''){
      this.api.postconek('pruebas.php', {id:this.user.id, nombre:this.nombre, telefono:this.telef, email:this.email}).then(async data =>{
        if(data==1){
          //this.utils.toastPresent("Se ha borrado de tu carrito");
          this.user.carrito = [];
          await this.str.setSorage('user', this.user);
          this.utils.navigater('confirmacion');
          alert("revisa tu correo para continuar con el pago");
        } 
      }).catch(err => {
        console.log("error",err);
        this.utils.toastPresent("Error al conectarse intente más tarde");
      });
    }else{
      alert('asegurate de llenar toda la información que necesitamos');
    }
    
  }
}
