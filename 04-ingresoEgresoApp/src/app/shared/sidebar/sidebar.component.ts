import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: Usuario;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
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

  logout(): void {
    this.authService.logout().then(
      () => this.router.navigateByUrl('/login')
    );
  }

}
