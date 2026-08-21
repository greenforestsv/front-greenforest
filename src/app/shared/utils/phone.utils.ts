import { isValidPhoneNumber } from 'libphonenumber-js';

export function buildPhoneNumber(phoneCode?: string, phone?: string): string | null {
  if (!phoneCode?.trim() || !phone?.trim()) {
    return null;
  }

  const fullPhone = `${phoneCode.trim()}${phone.trim()}`;

  return isValidPhoneNumber(fullPhone) ? fullPhone : null;
}

export function isValidOptionalPhone(phoneCode?: string, phone?: string): boolean {
  if (!phoneCode && !phone) {
    return true;
  }

  return !!buildPhoneNumber(phoneCode, phone);
}
