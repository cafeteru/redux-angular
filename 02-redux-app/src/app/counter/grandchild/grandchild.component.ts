import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { reset } from '../counter.actions';

@Component({
  selector: 'app-grandchild',
  templateUrl: './grandchild.component.html',
  styleUrls: ['./grandchild.component.css']
})
export class GrandchildComponent implements OnInit {
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

  reset(): void {
    this.store.dispatch(reset());
  }
}
