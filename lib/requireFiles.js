'use strict';

const Path = require('path');
const requireNameMethod = require('./requireNameMethod');

/*
 * Requires all js modules in `dirname` and maps as Hapi methods array
 * @function
 * @param {string} dirname - Path to require plugin from
 * @return {object} An object with in the format of `{ key: module }`
 */
module.exports = (dirname) => {

    return requireNameMethod(dirname)
        .reduce((acc, val) => {

            acc[val.name] = val.module;

            return acc;
        }, {});
};
