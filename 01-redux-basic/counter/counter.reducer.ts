import { Action } from "../ngrx-fake/ngrx";

// No hace llamadas externas para solucionar su ejecución
export function counterReducer(state = 10, action: Action) {
    switch (action.type) {
        case 'add':
            return state += 1;
        case 'minus':
            return state -= 1;
        case 'multiply':
            return state * action.payload;
        case 'divide':
            return state / action.payload;
        case 'reset':
            return state = 0;
        default:
            return state; // siempre devuelve un estado
    }
}