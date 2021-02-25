import { createAction, props } from '@ngrx/store';

export const crear = createAction('[TODO] Crea todo', props<{ texto: string }>());
export const toogle = createAction('[TODO] Toogle todo', props<{ id: number }>());
export const editar = createAction('[TODO] Editar todo', props<{ id: number, texto: string }>());
export const borrar = createAction('[TODO] Borrar todo', props<{ id: number }>());
export const completado = createAction('[TODO] Completado todo', props<{ completado: boolean }>());
export const limpiar = createAction('[TODO] Limpiar todo');
