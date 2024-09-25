'use strict';
const commons = require('commons');
function backend(name) {
    const common = commons(name);
    return `${common}, Hello  from backend`;
}
module.exports = backend;
