import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<DocumentReference<DocumentData>> {
    return this.firestore.doc(`${this.authService.usuario.uid}/ingresos-egresos`)
      // Obtiene la colección
      .collection('items')
      // Añade elemento
      .add({ ...ingresoEgreso });
  }

  initIngresoEgresosObservable(uid: string): Observable<IngresoEgreso[]> {
    return this.firestore.collection(
      `${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(
          (snapshot) => snapshot.map(
            value => {
              const doc = value.payload.doc;
              const ingresoEgreso = doc.data() as IngresoEgreso;
              ingresoEgreso.uid = doc.id;
              return ingresoEgreso;
            }
          )
        )
      );
  }

  borrarIngresoEgreso(uidItem: string): Promise<void> {
    return this.firestore.doc(
      `${this.authService.usuario.uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
