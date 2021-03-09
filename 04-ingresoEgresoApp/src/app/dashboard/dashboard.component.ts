import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }


  ngOnInit(): void {
    this.subscription = this.store.select('user')
      .pipe(
        filter((auth) => auth.user != null),
        switchMap(
          (state) => this.ingresoEgresoService.initIngresoEgresosObservable(state.user.uid)
        )
      ).subscribe(
        items => {
          this.store.dispatch(ingresoEgresoActions.setItems({ items }));
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(ingresoEgresoActions.unsetItems());
  }

}
