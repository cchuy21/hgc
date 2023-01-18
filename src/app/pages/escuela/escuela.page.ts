import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.page.html',
  styleUrls: ['./escuela.page.scss'],
})
export class EscuelaPage implements OnInit {

  img1 = '../../assets/images/HGC_LOGODORADO.png';
  img2 = '../../assets/images/HGC_FRONTLOGO.png';
  back = 'background1';
  img:string;
  btn:string;
  user = {
    tipo: 1
  };
  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private authService: AuthenticationService

  ) { }
  
  async ngOnInit() {

  }
  async ionViewWillEnter() {
    this.user =  JSON.parse(await this.storage.get('user'));
    if(this.user.tipo){
      this.img = this.img1;
      this.back = 'background1';
    }else{
      this.img = this.img2;
      this.back = 'background2';
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
}
