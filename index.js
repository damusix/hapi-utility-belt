'use strict';

const Fs = require('fs');
const Path = require('path');

module.exports = Fs.readdirSync(Path.resolve(__dirname, 'lib'))
    .reduce((acc, file) => {

        const name = file.split('.')[0];
        acc[name] = require(Path.resolve(__dirname, 'lib', file));

        return acc;
    }, {});
