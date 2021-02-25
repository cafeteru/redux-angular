import { ActionReducerMap } from '@ngrx/store';
import { FiltrosType } from './filtro/filtro.actions';
import { filtroReducer } from './filtro/filtro.reducer';
import { Todo } from './todos/models/todo';
import { todoReducer } from './todos/todo.reducer';

export interface AppState {
    todos: Todo[];
    filtro: FiltrosType;
}

export const appReducer: ActionReducerMap<AppState> = {
    todos: todoReducer,
    filtro: filtroReducer
};
