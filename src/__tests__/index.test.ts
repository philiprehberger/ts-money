import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('money-ts', () => {
  it('should export Money', () => {
    assert.ok(mod.Money);
  });

  it('should export money', () => {
    assert.ok(mod.money);
  });

  it('should export getCurrencyInfo', () => {
    assert.ok(mod.getCurrencyInfo);
  });
});
