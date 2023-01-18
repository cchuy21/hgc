import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './../../services/authentication/authentication.service';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  
  img1 = '../../assets/images/ejecutiva/HGC_LOGODORADO.png';
  img2 = '../../assets/images/deportiva/HGC_FRONTLOGO.png';
  img3 = '../../assets/images/rosa/HGC_RLOGOTIPO.png';
  back = 'background1';
  img:string;
  btn:string;
  user = {
    tipo: 1,
    nivel: 1
    };
  log=1;

  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private authService: AuthenticationService

  ) { }
  map = null;
  map2 = null;
  
  async ngOnInit() {

  }
  async ionViewWillEnter() {
    await this.storage.get('user').then( data => {
      if( data ){
        this.user =  JSON.parse(data);
        this.log = this.user.nivel;
      }else{
        this.log = 0;
        this.user = { tipo : 1,nivel : 1 };
      }
    }).catch(() => {
    });
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
    this.loadMap();
    this.loadMap2();
  }
  navigate(page){
    this.utils.navigate(page);
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 21.890550, lng: -102.295225};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      const marker = {
        position:{
          lat: 21.890550,
          lng: -102.295225
        },
        title: 'HGC'
      }
      this.addMarker(marker);
    });
  }

  loadMap2() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map2');
    // create LatLng object
    const myLatLng = {lat: 19.394671, lng: -99.055388};
    // create map
    this.map2 = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map2');
      const marker = {
        position:{
          lat: 19.394671,
          lng: -99.055388
        },
        title: 'CEDIS HGC'
      }
      this.addMarker2(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

  addMarker2(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map2,
      title: marker.title
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
    this.storage.clear().then(() => {
      this.user = {
        tipo: 1,
        nivel: 1
      };
      this.ionViewWillEnter();
    }).catch(() => {
      this.utils.toastPresent('Ocurrió un error al cerrar sesión. Intenta más tarde');
    });
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
