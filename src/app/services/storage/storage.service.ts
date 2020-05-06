import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  user = new BehaviorSubject(this.userAuth);

  set userAuth(value) {
    this.user.next(value); // informa a cada suscriptor sobre el cambio.
    localStorage.setItem('userAuth', JSON.stringify(value));
  }
 
  get userAuth() {
    return JSON.parse(localStorage.getItem('userAuth'));
  }

}
