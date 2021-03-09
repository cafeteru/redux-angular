import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresos: IngresoEgreso[] = [];
  subcription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subcription = this.store.select('ingresoEgresos').subscribe(
      ingresoEgresos => this.ingresoEgresos = ingresoEgresos.items
    );
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  borrar(uid: string): void {
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then(
      () => Swal.fire('Borrado', 'Item borrado', 'success')
    ).catch(
      () => Swal.fire('Error', 'Error al borrar', 'error')
    );
  }

}
