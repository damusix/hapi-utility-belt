'use strict';

const Fs = require('fs');
const Path = require('path');

/*
 * Requires a module from root folder mirrored in /test
 * @function
 * @param {string} pathname - Path to require plugin from
 * @param {string} replace - Path to replace, in case your path is not '/test'. Optional
 * @return {string} A path to your mirrored module
 */

module.exports = (pathname, replace='/test') => {

    const path = Path.resolve(pathname).replace(replace, '');
    return require(path);
};
