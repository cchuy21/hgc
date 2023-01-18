import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
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
    this.email = '';
    this.nombre = '';
    this.telef = '';
    
  }
  async ionViewWillEnter() {
      this.img = this.img1;
      this.back = 'background1';
  }
  
  navigate(page){
    this.utils.navigate(page);
  }

  validar(){
    if(this.nombre !='' && this.telef.length == 10 && this.email != ''){
      this.api.post('registro.php', { nombre:this.nombre, telefono:this.telef, email:this.email }).then(async data =>{
        if(data==1){
          alert('revisa tu correo para confirmar tu registro');
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