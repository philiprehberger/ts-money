export type RoundingMode = 'half-up' | 'half-down' | 'half-even' | 'floor' | 'ceil';

export interface MoneyLike {
  amount: bigint;
  currency: string;
  precision: number;
}
