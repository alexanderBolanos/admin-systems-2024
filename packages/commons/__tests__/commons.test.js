'use strict';
const commons = require('..');
const assert = require('assert').strict;

describe('testing commons', () => {
  const common = commons('test');
  it('should be equals', () => {
    expect(common).toBe('Hello test from commons');
  });
});

console.info('commons tests passed');
