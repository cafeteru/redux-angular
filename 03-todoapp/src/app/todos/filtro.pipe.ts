import { Pipe, PipeTransform } from '@angular/core';
import { FiltrosType } from '../filtro/filtro.actions';
import { Todo } from './models/todo';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Todo[], filtro: FiltrosType): unknown {
    switch (filtro) {
      case 'completados':
        return todos.filter(todo => todo.completado);
      case 'pendientes':
        return todos.filter(todo => !todo.completado);
      case 'todos':
        return todos;
      default:
        return null;
    }
  }

}
