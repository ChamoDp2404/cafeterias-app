import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  obtenerRolActual() {
    const user = this.auth.currentUser;
    if (!user) return of(null);

    const usuariosRef = collection(this.firestore, 'usuarios');
    const q = query(usuariosRef, where('email', '==', user.email));

    return from(getDocs(q)).pipe(
      map(snapshot => {
        const doc = snapshot.docs[0];
        const data = doc?.data();
        return data?.['rol'] || null;
      })
    );
  }
}
