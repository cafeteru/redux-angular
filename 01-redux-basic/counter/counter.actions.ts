import { Action } from "../ngrx-fake/ngrx";

export const addAction: Action = {
    type: 'add'
};

export const minusAction: Action = {
    type: 'minus'
};

export const multiplyAction: Action = {
    type: 'multiply',
    payload: 2
};

export const divideAction: Action = {
    type: 'divide',
    payload: 5
};

export const resetAction: Action = {
    type: 'reset',
};