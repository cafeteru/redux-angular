import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

import * as userActions from '../actions/users.actions';
import { UserEffects } from './user.effects';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions, // Escucha las acciones
    private userService: UserService
  ) { }

  loadUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(userActions.loadUsers),
      mergeMap(
        () => this.userService.getUsers().pipe(
          map(users => userActions.loadUsersSuccess({ users })),
          catchError(error => of(userActions.loadUsersError({ payload: error })))
        )
      )
    )
  );
}

export const Effects: any[] = [
  UsersEffects,
  UserEffects
];
