import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(date: string | Date | null | undefined): string {
    if (!date) {
      return '';
    }

    return dayjs(date).locale('es').format('D MMM YYYY');
  }
}
