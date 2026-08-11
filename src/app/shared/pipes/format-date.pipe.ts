import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(date: string | Date): string {
    return dayjs(date).format('D MMM YYYY');
  }
}
