import { Action, createReducer, on } from '@ngrx/store';

import { IngresoEgreso } from '../models/ingreso-egreso';
import * as actions from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[];
}

export const initialState: State = {
    items: []
};

const _ingresoEgresoReducer = createReducer(
    initialState,
    on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(actions.unsetItems, (state) => ({ ...state, items: [] })),
);

export function ingresoEgresoReducer(state: State, action: Action): State {
    return _ingresoEgresoReducer(state, action);
}
