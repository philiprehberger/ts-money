import type { RoundingMode } from './types';
import { getCurrencyInfo } from './currencies';

function roundBigInt(value: bigint, divisor: bigint, mode: RoundingMode): bigint {
  const quotient = value / divisor;
  const remainder = value % divisor;
  const half = divisor / 2n;
  const absRemainder = remainder < 0n ? -remainder : remainder;

  switch (mode) {
    case 'floor':
      return remainder < 0n ? quotient - 1n : quotient;
    case 'ceil':
      return remainder > 0n ? quotient + 1n : quotient;
    case 'half-down':
      return absRemainder > half ? (remainder > 0n ? quotient + 1n : quotient - 1n) : quotient;
    case 'half-even': {
      if (absRemainder === half) {
        return quotient % 2n === 0n ? quotient : (remainder > 0n ? quotient + 1n : quotient - 1n);
      }
      return absRemainder > half ? (remainder > 0n ? quotient + 1n : quotient - 1n) : quotient;
    }
    case 'half-up':
    default:
      return absRemainder >= half ? (remainder > 0n ? quotient + 1n : quotient - 1n) : quotient;
  }
}

export class Money {
  readonly amount: bigint;
  readonly currency: string;
  readonly precision: number;

  constructor(amount: bigint, currency: string, precision?: number) {
    this.amount = amount;
    this.currency = currency.toUpperCase();
    this.precision = precision ?? getCurrencyInfo(this.currency).precision;
  }

  static fromDecimal(decimal: number, currency: string): Money {
    const info = getCurrencyInfo(currency);
    const factor = 10 ** info.precision;
    const amount = BigInt(Math.round(decimal * factor));
    return new Money(amount, currency, info.precision);
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(`Currency mismatch: ${this.currency} vs ${other.currency}`);
    }
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency, this.precision);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency, this.precision);
  }

  multiply(n: number): Money {
    const scaled = BigInt(Math.round(n * 10000));
    const result = roundBigInt(this.amount * scaled, 10000n, 'half-up');
    return new Money(result, this.currency, this.precision);
  }

  divide(n: number, roundingMode: RoundingMode = 'half-up'): Money {
    if (n === 0) throw new Error('Cannot divide by zero');
    const scaled = BigInt(Math.round(n * 10000));
    const result = roundBigInt(this.amount * 10000n, scaled, roundingMode);
    return new Money(result, this.currency, this.precision);
  }

  percentage(pct: number): Money {
    return this.multiply(pct / 100);
  }

  negate(): Money {
    return new Money(-this.amount, this.currency, this.precision);
  }

  abs(): Money {
    return new Money(this.amount < 0n ? -this.amount : this.amount, this.currency, this.precision);
  }

  allocate(ratios: number[]): Money[] {
    const total = ratios.reduce((a, b) => a + b, 0);
    if (total === 0) throw new Error('Ratios must sum to a positive number');

    const amounts: bigint[] = [];
    let allocated = 0n;

    for (let i = 0; i < ratios.length; i++) {
      const share = (this.amount * BigInt(Math.round(ratios[i] * 1000))) / BigInt(Math.round(total * 1000));
      amounts.push(share);
      allocated += share;
    }

    let remainder = this.amount - allocated;
    let i = 0;
    while (remainder > 0n) {
      amounts[i % amounts.length] += 1n;
      remainder -= 1n;
      i++;
    }
    while (remainder < 0n) {
      amounts[i % amounts.length] -= 1n;
      remainder += 1n;
      i++;
    }

    return amounts.map((a) => new Money(a, this.currency, this.precision));
  }

  format(locale?: string): string {
    const decimal = this.toDecimal();
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency,
    }).format(decimal);
  }

  toDecimal(): number {
    const factor = 10 ** this.precision;
    return Number(this.amount) / factor;
  }

  toCents(): number {
    return Number(this.amount);
  }

  equals(other: Money): boolean {
    return this.currency === other.currency && this.amount === other.amount;
  }

  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount > other.amount;
  }

  lessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount < other.amount;
  }

  greaterThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount >= other.amount;
  }

  lessThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount <= other.amount;
  }

  isZero(): boolean { return this.amount === 0n; }
  isPositive(): boolean { return this.amount > 0n; }
  isNegative(): boolean { return this.amount < 0n; }
}

export function money(cents: number, currency: string): Money {
  return new Money(BigInt(cents), currency);
}

money.fromDecimal = Money.fromDecimal;
