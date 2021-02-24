import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../counter.actions';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent implements OnInit {
  counter: number;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store.select('counter').subscribe(
      counter => this.counter = counter
    );
  }

  multiply(): void {
    this.store.dispatch(actions.multiply({ value: 2 }));
  }

  divide(): void {
    this.store.dispatch(actions.divide({ value: 2 }));
  }


}
