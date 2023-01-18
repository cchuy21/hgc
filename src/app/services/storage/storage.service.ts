import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async getStorage(id) {
    return this.storage.get(id).then(response => {
      return response ? JSON.parse(response) : [];
    });
  }
  async setSorage(id, obj) {
    return this.storage.set(id, JSON.stringify(obj));
  }
  async deleteStorage(id) {
    return this.storage.remove(id);
  }
}
