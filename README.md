# @philiprehberger/money-ts

[![CI](https://github.com/philiprehberger/money-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/money-ts/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/money-ts.svg)](https://www.npmjs.com/package/@philiprehberger/money-ts)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/money-ts)](https://github.com/philiprehberger/money-ts/commits/main)

Precise money and currency arithmetic

## Installation

```bash
npm install @philiprehberger/money-ts
```

## Usage

```ts
import { money } from '@philiprehberger/money-ts';

const price = money(1099, 'USD');
const tax = price.percentage(8.5);
const total = price.add(tax);
total.format();        // "$11.92"
total.format('de-DE'); // "11,92 $"

const [a, b] = total.allocate([60, 40]); // handles remainders
```

### From Decimal

```ts
import { money } from '@philiprehberger/money-ts';

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

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/money-ts)

🐛 [Report issues](https://github.com/philiprehberger/money-ts/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/money-ts/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
