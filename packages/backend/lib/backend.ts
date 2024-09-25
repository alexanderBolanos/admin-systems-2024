'use strict';

const commons = require('commons');

function backend(name: string): string {
  const common = commons(name);
  return `${common}, Hello  from backend`;
}

module.exports = backend;
