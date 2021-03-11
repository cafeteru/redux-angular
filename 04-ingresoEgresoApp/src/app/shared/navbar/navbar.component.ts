import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: Usuario;
  subscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('user').subscribe(
      state => this.user = state.user
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
