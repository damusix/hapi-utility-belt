'use strict';

const Path = require('path');
const requireNameModule = require('./requireNameModule');

module.exports = (dirname) => {

    return requireNameModule(dirname)
        .map((val) => ({
            name: val.name,
            method: val.module
        }));
};
