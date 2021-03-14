import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { loadUsers } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: any;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.select('usersState').subscribe(
      userState => {
        this.users = userState.users;
        this.loading = userState.loading;
        this.error = userState.error;
      }
    );
  }

}
