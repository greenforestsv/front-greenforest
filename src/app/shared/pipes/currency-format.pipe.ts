import { Pipe, PipeTransform } from '@angular/core';

export type CurrencyCode = 'HNL' | 'USD' | 'GTQ' | 'CRC' | 'NIO' | 'EUR';

const currencySymbols: Record<CurrencyCode, string> = {
  HNL: 'L',
  USD: '$',
  GTQ: 'Q',
  CRC: '₡',
  NIO: 'C$',
  EUR: '€',
};

@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | string | null | undefined, currency: CurrencyCode = 'USD'): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const amount = Number(value);

    if (Number.isNaN(amount)) {
      return '';
    }

    const formatted = new Intl.NumberFormat('en-US', {
      //minimumFractionDigits: 2,
      //maximumFractionDigits: 2,
    }).format(amount);

    return `${currencySymbols[currency]} ${formatted}`;
  }
}
