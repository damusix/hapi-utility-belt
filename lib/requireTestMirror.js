'use strict';


const Fs = require('fs');
const Path = require('path');

module.exports = (file='', replace='/test') => {

    const path = Path.resolve(process.cwd(), file).replace(replace, '');
    return require(path);
};
