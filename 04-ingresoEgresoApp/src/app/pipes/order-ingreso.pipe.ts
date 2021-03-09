import { Pipe, PipeTransform } from '@angular/core';

import { IngresoEgreso } from '../models/ingreso-egreso';

@Pipe({
  name: 'orderIngreso'
})
export class OrdeIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      }
      return 1;
    });
  }

}
