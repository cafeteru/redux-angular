import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';

import * as userActions from '../actions/user.actions';

export interface UserState {
    id: string;
    user: User;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const userInitialState: UserState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
};

const featureReducer = createReducer(
    userInitialState,
    on(userActions.loadUser, (state, { id }) => ({
        ...state,
        loading: true,
        id
    })),
    on(userActions.loadUserSuccess, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        user: {...action.user}
    })),
    on(userActions.loadUserError, (state, action) => ({
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
        user: null
    })),
);

export function userReducer(state: UserState, action: Action): UserState {
    return featureReducer(state, action);
}
