import { Action, createReducer, on } from '@ngrx/store';

import { Usuario } from '../models/usuario';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: Usuario;
}

export const initialState: State = {
    user: null
};

// tslint:disable-next-line: variable-name
const _authReducer = createReducer(
    initialState,
    on(setUser, (state, props) => ({ ...state, user: { ...props.user } })),
    on(unSetUser, (state) => ({ ...state, user: null })),
);

export function authReducer(state: State, action: Action): State {
    return _authReducer(state, action);
}
