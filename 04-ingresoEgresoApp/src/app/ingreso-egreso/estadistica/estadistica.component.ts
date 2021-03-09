import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  numIngresos: number;
  numEgresos: number;
  totalIngresos: number;
  totalEgresos: number;
  subscription: Subscription;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgresos').subscribe(
      (state) => {
        this.generarEstadisticas(state.items);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  generarEstadisticas(items: IngresoEgreso[]): void {
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.numEgresos = 0;
    this.numIngresos = 0;
    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.numIngresos++;
      } else {
        this.totalEgresos += item.monto;
        this.numEgresos++;
      }
    });
    this.doughnutChartData = [
      [this.totalIngresos, this.totalEgresos]
    ];
  }

}
