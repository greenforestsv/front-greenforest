import { Pipe, PipeTransform } from '@angular/core';
import { PROCESSES } from '../../core/constants/processes.constants';

@Pipe({
  name: 'processName',
  standalone: true,
})
export class ProcessNamePipe implements PipeTransform {
  transform(processIds: number[] | null | undefined): string {
    if (!processIds?.length) {
      return '';
    }

    return processIds
      .map((id) => PROCESSES.find((process) => process.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  }
}
