'use strict';


const Fs = require('fs');
const Path = require('path');

module.exports = (dirname, file='', replace='/test') => {

    const path = Path.resolve(dirname, file).replace(replace, '');
    return require(path);
};
