import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';

import * as usersActions from '../actions/users.actions';

export interface UsersState {
    users: User[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initialState: UsersState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};

const featureReducer = createReducer(
    initialState,
    on(usersActions.loadUsers, state => ({ ...state, loading: true })),
    on(usersActions.loadUsersSuccess, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        users: [...action.users]
    })),
    on(usersActions.loadUsersError, (state, action) => ({
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
        users: []
    })),
);

export function usersReducer(state: UsersState, action: Action): UsersState {
    return featureReducer(state, action);
}
