import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { loadUser } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  susbcription: Subscription;
  user: User;
  loading = false;
  error: any;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.susbcription = this.router.params.subscribe(
      ({ id }) => {
        this.store.dispatch(loadUser({ id }));
        this.store.select('userState').subscribe(
          userState => {
            this.user = userState.user;
            this.loading = userState.loading;
            this.error = userState.error;
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.susbcription.unsubscribe();
  }
}
