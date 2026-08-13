import { Pipe, PipeTransform } from '@angular/core';

export enum Gender {
  FEMALE = 'F',
  MALE = 'M',
  OTHER = 'U',
}

const genderLabels: Record<Gender, string> = {
  [Gender.FEMALE]: 'Mujer',
  [Gender.MALE]: 'Hombre',
  [Gender.OTHER]: 'Otro',
};

@Pipe({
  name: 'gender',
  standalone: true,
})
export class GenderPipe implements PipeTransform {
  transform(gender?: Gender | string | null): string {
    return genderLabels[gender as Gender] ?? 'Otro';
  }
}
