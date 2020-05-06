import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsuarios() {
    return this.firestore.collection('users').snapshotChanges();
  }

  getUsuario(userId: string) {
    return this.firestore.doc('users/'+userId).get();
  }

  async createUsuario(user: User) {
    return await this.firestore.collection('users').add(user);
  }

  updateUsuario(user: User) {
      this.firestore.doc('users/' + user.id).update(user);
  }

  deleteUsuario(userId: string) {
      this.firestore.doc('users/' + userId).delete();
  }

  getUserarioLogin(username: string, password: string) {
    return this.firestore.collection('users', ref => ref
            .where('username', '==', username)
            .where('password', '==', password)
            .limit(1))
      .snapshotChanges();
  }
}
