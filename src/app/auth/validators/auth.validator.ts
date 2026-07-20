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
export const endDateAfterStartDateValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  if (!startDate || !endDate) return null;

  return dayjs(endDate).isAfter(dayjs(startDate)) || dayjs(endDate).isSame(dayjs(startDate))
    ? null
    : { endDateBeforeStartDate: true };
};
