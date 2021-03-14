import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const loadUsers = createAction('[Users] Load users');
export const loadUsersSuccess = createAction(
    '[Users] Load users success',
    props<{ users: User[] }>());
export const loadUsersError = createAction(
    '[Users] Load users error',
    props<{ payload: any }>());
