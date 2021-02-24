import { Action, createReducer, on } from '@ngrx/store';
import { decrement, divide, increment, multiply, reset } from './counter.actions';

export const initialState = 10;

// tslint:disable-next-line: variable-name
const _counterReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1),
    on(multiply, (state, props) => state * props.value),
    on(divide, (state, props) => state / props.value),
    on(reset, (state) => state = 0),
);

export function counterReducer(state: number, action: Action): number {
    return _counterReducer(state, action);
}
