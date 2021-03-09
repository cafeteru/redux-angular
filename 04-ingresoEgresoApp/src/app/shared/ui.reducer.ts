import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
};

// tslint:disable-next-line: variable-name
const _uiReducer = createReducer(
    initialState,
    on(actions.initLoading, (state) => ({ ...state, isLoading: true })),
    on(actions.stopLoading, (state) => ({ ...state, isLoading: false })),
);

export function uiReducer(state: State, action: Action): State {
    return _uiReducer(state, action);
}
