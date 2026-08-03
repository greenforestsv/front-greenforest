import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isValidPhoneNumber } from 'libphonenumber-js';

/* PASSWORD */
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};

/* CORREO */
export const emailMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const email = control.get('email');
  const confirmEmail = control.get('confirmEmail');

  if (!email || !confirmEmail) return null;

  return email.value === confirmEmail.value ? null : { emailMismatch: true };
};

/* FECHA */
dayjs.extend(customParseFormat);

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return null;

    const valid = dayjs(control.value, 'YYYY-MM-DD', true).isValid();

    return valid ? null : { invalidDate: true };
  };
}

/* NÚMERO DE TELÉFONO */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return null;

    return isValidPhoneNumber(control.value) ? null : { invalidPhone: true };
  };
}

/* VALIDADOR FECHA FIN MAYOR A FECHA INICIO */
export function endDateAfterStartDateValidator(
  startControl = 'start_date',
  endControl = 'end_date',
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get(startControl)?.value;
    const end = group.get(endControl)?.value;

    if (!start || !end) {
      return null;
    }

    return dayjs(end).isBefore(dayjs(start), 'day') ? { endDateBeforeStartDate: true } : null;
  };
}
