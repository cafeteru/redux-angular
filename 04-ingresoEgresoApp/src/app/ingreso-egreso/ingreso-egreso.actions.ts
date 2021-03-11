import { createAction, props } from '@ngrx/store';

import { IngresoEgreso } from '../models/ingreso-egreso';

export const setItems = createAction(
    '[IngresoEgreso] setItems',
    props<{ items: IngresoEgreso[] }>());
export const unsetItems = createAction('[IngresoEgreso] unsetItems');
