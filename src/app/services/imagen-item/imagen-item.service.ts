import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImagenItem } from 'src/app/models/imagen-item/imagen-item';
import { ImagenService } from '../imagen/imagen.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenItemService {

  constructor(private firestore: AngularFirestore, private imagenService: ImagenService) { }

  getImagenes() {
    return this.firestore.collection('imagen-items').snapshotChanges();
  }

  getImagenItem(imagenId: string) {
    return this.firestore.doc('imagen-items/'+imagenId).get();
  }

 async createImagenItem(imagenItem: ImagenItem) {
   
    if(imagenItem.imagenUrl.length > 0 ) {
      imagenItem.imagenUrl = await this.uploadImagen(imagenItem.imagenUrl);
      return await this.firestore.collection('imagen-items').add(imagenItem);
    } else {
      return null;
    }
  }

  deleteImagenItem(imagenId: string) {
    this.firestore.doc('imagen-items/' + imagenId).delete();
  }

  private async uploadImagen(base64: string) {

    return await this.imagenService.uploadImage(base64, 'galery');

  }

}
