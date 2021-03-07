import 'firebase/firestore';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;

  constructor(
    private auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener(): void {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        // Obtiene los datos
        this.userSubscription = this.firestore.doc(`/${fuser.uid}/usuario`).valueChanges().subscribe(
          (res: any) => {
            this.store.dispatch(setUser({
              user: Usuario.fromFirebase(res)
            }));
          }
        );
      } else {
        this.userSubscription?.unsubscribe();
        this.store.dispatch(unSetUser());
      }
    });
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
    return this.firestore.doc(`/${user.uid}/usuario`).set({ ...user });
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
