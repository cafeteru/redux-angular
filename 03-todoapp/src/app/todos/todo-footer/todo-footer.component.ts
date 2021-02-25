import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filtro/filtro.actions';
import { limpiar } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  filtroActual: actions.FiltrosType = 'todos';
  filtros: actions.FiltrosType[] = ['completados', 'pendientes', 'todos'];
  numTareasPendientes = 0;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store.subscribe(
      store => {
        this.filtroActual = store.filtro;
        this.numTareasPendientes = store.todos.filter(todo => !todo.completado).length;
      }
    );
  }

  cambioFiltro(filtro: actions.FiltrosType): void {
    this.store.dispatch(actions.setFiltro({ filtro }));
  }

  limpiarCompletados(): void {
    this.store.dispatch(limpiar());
  }
}
