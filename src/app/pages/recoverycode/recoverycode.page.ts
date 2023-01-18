import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-recoverycode',
  templateUrl: './recoverycode.page.html',
  styleUrls: ['./recoverycode.page.scss'],
})
export class RecoverycodePage implements OnInit {
  logindata:any = {};

  constructor(
    private modalctrl: ModalController, 
    private utils: UtilsService,
    private api: ApiService
  ) {
    this.logindata.email = "";

  }
  async ngOnInit() {

  }

  recovery(){
    if(this.logindata.codigo !=""){
      this.api.post('recovery.php', {email: this.logindata.email}).then(async data =>{
        if(data != null){
          console.log(data);
          this.modalctrl.dismiss();
        }else{
          console.log(data);
          this.modalctrl.dismiss();
        } 
      }).catch(err => {
        console.log("error",err);
        this.utils.toastPresent("Error al conectarse intente más tarde");
      });

    }else{
          console.log("ERROR")
    }
  }

  salir(){
    this.modalctrl.dismiss();
  }
}
