'use strict';
const backend = require('../lib/backend');
describe('testing backend', () => {
  const result = backend('test');
  it('should be equals', () => {
    expect(result).toBe('Hello test from commons, Hello  from backend');
  });
});

console.info('backend tests passed');
