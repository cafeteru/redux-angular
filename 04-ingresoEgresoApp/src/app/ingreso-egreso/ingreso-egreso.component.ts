import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { initLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  tipo = 'ingreso';
  loading = false;
  subscription: Subscription;

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required)
    });
    this.subscription = this.store.select('ui').subscribe(
      ui => this.loading = ui.isLoading
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  guardar(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(initLoading());
      const { descripcion, monto } = this.formGroup.value;
      const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
      this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(
        () => {
          this.store.dispatch(stopLoading());
          this.formGroup.reset();
          Swal.fire({
            icon: 'success',
            title: 'Registro creado'
          });
        }
      ).catch(
        error => {
          this.store.dispatch(stopLoading());
          Swal.fire({
            icon: 'error',
            title: error.message
          });
        }
      );
    }
  }

}
