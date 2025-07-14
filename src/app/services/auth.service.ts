import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<User | null>(null);
  isLoggedIn$ = this.usuarioActualSubject.asObservable(); // ✅ Usado en navbar.component.html

  constructor(private auth: Auth) {
    // Detecta cambios de sesión y actualiza el estado del usuario
    onAuthStateChanged(this.auth, (user) => {
      this.usuarioActualSubject.next(user);
    });
  }

  registrar(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  get usuarioActual() {
    return this.auth.currentUser;
  }
}
