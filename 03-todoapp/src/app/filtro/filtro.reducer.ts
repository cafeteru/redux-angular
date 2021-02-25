import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './filtro.actions';
import { FiltrosType } from './filtro.actions';


export const initialState: FiltrosType = 'todos';

// tslint:disable-next-line: variable-name
const _filtroReducer = createReducer(
    initialState,
    on(actions.setFiltro, (state: FiltrosType, props) => props.filtro)
);

export function filtroReducer(state: FiltrosType, action: Action): FiltrosType {
    return _filtroReducer(state, action);
}
