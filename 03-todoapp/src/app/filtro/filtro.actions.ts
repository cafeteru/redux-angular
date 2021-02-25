import { createAction, props } from '@ngrx/store';

export type FiltrosType = 'todos' | 'completados' | 'pendientes';

export const setFiltro = createAction('[Filtro] Crea filtro', props<{ filtro: FiltrosType }>());
