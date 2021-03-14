import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const loadUser = createAction(
    '[Users] Load user',
    props<{ id: string }>());
export const loadUserSuccess = createAction(
    '[Users] Load user success',
    props<{ user: User }>());
export const loadUserError = createAction(
    '[Users] Load user error',
    props<{ payload: any }>());
