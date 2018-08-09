'use strict';

const Path = require('path');
const requireNameModule = require('./requireNameModule');

module.exports = (dirname) => {

    return requireNameModule(dirname)
        .reduce((acc, val) => {

            acc[val.name] = val.module;

            return acc;
        }, {});
};
