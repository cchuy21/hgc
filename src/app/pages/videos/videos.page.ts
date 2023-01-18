import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from './../../services/authentication/authentication.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  videos = [];
  user = {
    tipo: 1,
    favoritos: [],
    id:0,
    carrito: []
  };
  img:string;
  img1 = '../../assets/images/HGC_LOGODORADO.png';
  img2 = '../../assets/images/HGC_FRONTLOGO.png';
  back = 'background1';
  constructor(
    private storage: Storage,
    private stra: StorageService,
    private utils: UtilsService,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    for(let vid in this.videos){
      this.videos[vid].video=this.sanitizer.bypassSecurityTrustResourceUrl(this.videos[vid].video);
    }
    this.user =  JSON.parse(await this.storage.get('user'));
    if(this.user.tipo){
      this.img = this.img1;
      this.back = 'background1';

    }else{
      this.img = this.img2;
      this.back = 'background2';

    }
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
