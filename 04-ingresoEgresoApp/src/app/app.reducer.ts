import { ActionReducerMap } from '@ngrx/store';

import * as auth from './auth/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import * as ui from './shared/ui.reducer';

export interface AppState {
    ingresoEgreso: ingresoEgreso.State;
    ui: ui.State;
    user: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ingresoEgreso: ingresoEgreso.ingresoEgresoReducer,
    ui: ui.uiReducer,
    user: auth.authReducer,
};
