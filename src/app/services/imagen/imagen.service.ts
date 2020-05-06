import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private baseUrl : string = 'imagenes/users/';

  constructor( private storage: AngularFireStorage) { }


  uploadImage(file: any, baseName: string): Promise<string> {

    if ( typeof file === 'string' && this.isBase64(file)) {
      file = this.recoverImagenFile(file, baseName + '-' + this.generarID());
    }

    return new Promise((resolve, reject) => {
      const upload = this.storage.upload(this.baseUrl + file.name, file);
      const fileRef = this.storage.ref(this.baseUrl + file.name);
      upload.snapshotChanges().pipe(finalize(() => fileRef.getDownloadURL().subscribe(urlImage => {
        resolve(urlImage); 
      }))).subscribe();
    }); 
  }


  recoverImagenFile(base64: any, name: string): File {
    var imagenObj = base64.split(',');
    var imagen_type = imagenObj[0].split(':')[1].split(";")[0];
    var extension = imagen_type.split('/')[1];
    var imagen_content = imagenObj[1];
    var binary = this.fixBinary(window.atob(imagen_content));// <-- Usamos la fn "fixBinary"
    var the_file = new Blob([binary], {type: imagen_type});// <-- Sacamos el encode
    var imagen_file = new File([the_file], name + '.' + extension, { type: imagen_type });
    return imagen_file;
  }

  private fixBinary (bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }

  private isBase64(uri: string) {
    const regex = /base64,/gi;
    let match = regex.exec(uri);
    return (match != null)
  }

  private generarID(): string {
    const myId = uuid.v4();
    return myId + '-' + Date.now();
  }
}
