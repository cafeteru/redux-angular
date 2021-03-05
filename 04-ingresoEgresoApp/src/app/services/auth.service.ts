import 'firebase/firestore';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    public afs: AngularFirestore
  ) { }

  initAuthListener(): void {
    this.auth.authState.subscribe(fuser => console.warn(fuser));
  }

  async crearUsuario(
    nombre: string,
    email: string,
    contrasenia: string
  ): Promise<void> {
    // Crea al usuario en firebase
    const fuser = await this.auth.createUserWithEmailAndPassword(email, contrasenia);
    const user = new Usuario(fuser.user.uid, nombre, email);
    // Crea el documento del usuario
    return this.afs.doc(`/${user.uid}/usuario`).set({ ...user });
  }

  login(
    email: string,
    contrasenia: string
  ): Promise<firebase.default.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, contrasenia);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    );
  }
}
