import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  authState // ✅ Importamos authState
} from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs'; // ✅ Importamos Observable

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSubject = new BehaviorSubject<User | null>(null);
  isLoggedIn$ = this.usuarioActualSubject.asObservable();

  // ✅ Nuevo: observable del usuario actual
  user$: Observable<User | null>; // 👈 Necesario para comentarios

  // Nuevo: guardar el rol del usuario
  private rolUsuario: 'admin' | 'usuario' | null = null;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = authState(this.auth); // ✅ inicializa el observable

    onAuthStateChanged(this.auth, async (user) => {
      this.usuarioActualSubject.next(user);

      if (user) {
        const docRef = doc(this.firestore, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        this.rolUsuario = docSnap.exists() ? (docSnap.data()['rol'] as 'admin' | 'usuario') : null;
        console.log('🧑‍💼 Rol del usuario:', this.rolUsuario);
      } else {
        this.rolUsuario = null;
      }
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

  // Nuevo: obtener rol
  get rolActual(): 'admin' | 'usuario' | null {
    return this.rolUsuario;
  }
}
