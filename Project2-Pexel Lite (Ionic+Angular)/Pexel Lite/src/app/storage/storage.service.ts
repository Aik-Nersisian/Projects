import { Injectable } from '@angular/core';
import { Image } from '../home/image.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  flag: boolean;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public saveNewImage(key: string, value: string) {
    var newImage = new Image(key, value);
    this._storage?.set(key, newImage);
  }

  public getAllImages() {
    var allImages: Image[] = [];
    if (this._storage != null) {
      this._storage.forEach((value, key, index) => {
        allImages.push(value as Image);
      });
    }
    return allImages;
  }

  public async deleteAllImages() {
    await this._storage.clear();
  }

  public async deleteOneImage(image: Image) {
    await this._storage.remove(image.id);
  }
}
