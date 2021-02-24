import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import * as actions from './counter/counter.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter: number;

  constructor(
    private store: Store<AppState>
  ) {
    // select: para seleccionar el elemento en concreto
    // y solo se lanza si cambia ese elemento
    this.store.select('counter').subscribe(
      counter => this.counter = counter
    );
  }

  add(): void {
    this.store.dispatch(actions.increment());
  }

  subtract(): void {
    this.store.dispatch(actions.decrement());
  }
}
