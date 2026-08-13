import { Pipe, PipeTransform } from '@angular/core';

export interface PersonName {
  first_name?: string | null;
  second_name?: string | null;
  first_surname?: string | null;
  second_surname?: string | null;
}

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(person?: PersonName | null): string {
    if (!person) {
      return '';
    }

    return [person.first_name, person.second_name, person.first_surname, person.second_surname]
      .filter(Boolean)
      .join(' ');
  }
}
