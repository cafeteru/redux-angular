import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo';
import * as actions from './todo.actions';


export const initialState: Todo[] = [
    new Todo('Prueba 1'),
    new Todo('Prueba 2')
];

// tslint:disable-next-line: variable-name
const _todoReducer = createReducer(
    initialState,
    on(actions.crear, (state, props) => [...state, new Todo(props.texto)]),
    on(actions.toogle, (state, props) => {
        return state.map(todo => {
            if (todo.id === props.id) {
                // Mandar siempre copias para evitar problemas
                return {
                    ...todo,
                    completado: !todo.completado
                };
            }
            return todo;
        });
    }),
    on(actions.editar, (state, props) => {
        return state.map(todo => {
            if (todo.id === props.id) {
                // Mandar siempre copias para evitar problemas
                return {
                    ...todo,
                    texto: props.texto
                };
            }
            return todo;
        });
    }),
    on(actions.borrar, (state, props) => state.filter(todo => todo.id !== props.id)),
    on(actions.completado, (state, props) => state.map(todo => {
        return {
            ...todo,
            completado: props.completado
        };
    })),
    on(actions.limpiar, (state) => state.filter(todo => !todo.completado))
);

export function todoReducer(state: Todo[], action: Action): Todo[] {
    return _todoReducer(state, action);
}
