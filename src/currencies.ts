export interface CurrencyInfo {
  code: string;
  precision: number;
  symbol?: string;
}

const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', precision: 2, symbol: '$' },
  EUR: { code: 'EUR', precision: 2, symbol: '€' },
  GBP: { code: 'GBP', precision: 2, symbol: '£' },
  JPY: { code: 'JPY', precision: 0, symbol: '¥' },
  CHF: { code: 'CHF', precision: 2 },
  CAD: { code: 'CAD', precision: 2, symbol: 'CA$' },
  AUD: { code: 'AUD', precision: 2, symbol: 'A$' },
  CNY: { code: 'CNY', precision: 2, symbol: '¥' },
  INR: { code: 'INR', precision: 2, symbol: '₹' },
  BRL: { code: 'BRL', precision: 2, symbol: 'R$' },
  KRW: { code: 'KRW', precision: 0, symbol: '₩' },
  SEK: { code: 'SEK', precision: 2 },
  NOK: { code: 'NOK', precision: 2 },
  DKK: { code: 'DKK', precision: 2 },
  PLN: { code: 'PLN', precision: 2 },
  BHD: { code: 'BHD', precision: 3 },
  KWD: { code: 'KWD', precision: 3 },
  OMR: { code: 'OMR', precision: 3 },
};

export function getCurrencyInfo(code: string): CurrencyInfo {
  return CURRENCIES[code.toUpperCase()] ?? { code: code.toUpperCase(), precision: 2 };
}
