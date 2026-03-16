# @philiprehberger/ts-money

[![CI](https://github.com/philiprehberger/ts-money/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-money/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/ts-money.svg)](https://www.npmjs.com/package/@philiprehberger/ts-money)
[![License](https://img.shields.io/github/license/philiprehberger/ts-money)](LICENSE)

Precise money and currency arithmetic.

## Installation

```bash
npm install @philiprehberger/ts-money
```

## Usage

```ts
import { money } from '@philiprehberger/ts-money';

const price = money(1099, 'USD');
const tax = price.percentage(8.5);
const total = price.add(tax);
total.format();        // "$11.92"
total.format('de-DE'); // "11,92 $"

const [a, b] = total.allocate([60, 40]); // handles remainders
```

### From Decimal

```ts
import { money } from '@philiprehberger/ts-money';

const price = money.fromDecimal(10.99, 'USD');
price.toCents(); // 1099
```

## API

| Method | Description |
|--------|-------------|
| `money(cents, currency)` | Create from minor units |
| `money.fromDecimal(decimal, currency)` | Create from decimal |
| `.add(other)` / `.subtract(other)` | Arithmetic (same currency) |
| `.multiply(n)` / `.divide(n)` / `.percentage(pct)` | Scaling |
| `.allocate(ratios)` | Split with remainder handling |
| `.format(locale?)` | Intl.NumberFormat currency string |
| `.toDecimal()` / `.toCents()` | Conversion |
| `.equals()` / `.greaterThan()` / `.lessThan()` | Comparison |

## License

MIT
