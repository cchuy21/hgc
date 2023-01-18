import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../../environments/environment';

import { UtilsService } from '../utils/utils.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_key:any;
  constructor(
    private http: HTTP,
    private utils: UtilsService,
    private auth: AuthenticationService,
  ) {
    this.api_key=environment.api_key;
  }
  async postconek(route: string, obj) {
    this.setHeaders();
    await this.utils.presentLoader();
    return this.http.post(environment.conekta + route, obj, {}).then(async data => {
      await this.utils.dismissLoader();
      const response = JSON.parse(data.data);
      console.log(response);
      return response;
    }).catch(async error => {
      await this.utils.dismissLoader();
      this.errorHandler(error);
      console.log(error);
      return null;
    });
  }
  async post(route: string, obj) {
    this.setHeaders();
    await this.utils.presentLoader();
    return this.http.post(environment.api + route, obj, {}).then(async data => {
      await this.utils.dismissLoader();
      const response = JSON.parse(data.data);
      console.log(response);
      return response;
    }).catch(async error => {
      await this.utils.dismissLoader();
      this.errorHandler(error);
      console.log(error);
      return null;
    });
  }

  async post2(route: string, obj) {
    this.setHeaders();
    return this.http.post(environment.api + route, obj, {}).then(async data => {
      const response = JSON.parse(data.data);
      console.log(response);
      return response;
    }).catch(async error => {
      this.errorHandler(error);
      console.log(error);
      return null;
    });
  }

  async get(route: string, obj) {
    await this.utils.presentLoader();
    this.setHeaders();
    return this.http.get(environment.api + route, obj, {}).then(async data => {
      await this.utils.dismissLoader();
      const response = JSON.parse(data.data);
      return response;
    }).catch(async error => {
      await this.utils.dismissLoader();
      this.errorHandler(error);
      return [];
    });
  }

  private errorHandler(error) {
    const header = 'Error';
    console.log(error.error);
    switch (error.status) {
      case 400:
        const errorObj = JSON.parse(error.error);
        this.utils.toastPresent(errorObj.Mensaje, header);
        break;
      case 401:
        //this.auth.logout();
        break;
      case 404:
        this.utils.toastPresent('Ruta no encontrada', header);
        break;
      case 500:
        this.utils.toastPresent('Ocurrió un error en el servidor. Intente más tarde.', header);
        break;
      default:
        this.utils.toastPresent('Error no controlado', header);
        break;
    }
  }

  private setHeaders() {
    this.http.clearCookies();
  }
}
