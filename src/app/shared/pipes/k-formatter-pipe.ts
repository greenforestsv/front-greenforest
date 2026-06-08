import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kFormatter',
})
export class KFormatterPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';

    if (value >= 1000) {
      // Divide entre 1000, deja 1 decimal (toFixed(1)) y reemplaza el punto si es .0
      return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }

    return value.toString();
  }
}
