import { ActionReducerMap } from '@ngrx/store';

import { userReducer, UserState } from './reducers/user.reducer';
import { usersReducer, UsersState } from './reducers/users.reducer';


export interface AppState {
    usersState: UsersState;
    userState: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    usersState: usersReducer,
    userState: userReducer
};
