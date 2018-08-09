'use strict';


const Fs = require('fs');
const Path = require('path');

module.exports = (dirname) => {
    return Fs.readdirSync(dirname)
    .filter((f) => f !== 'index.js');
};
