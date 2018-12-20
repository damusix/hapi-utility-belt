

const Path = require('path');

/*
 * Creates a path from test file that mirrors current module
 * @function
 * @param {string} pathname - Path to require plugin from
 * @param {string} replace - Path to replace, in case your path is not '/test'. Optional
 * @return {string} A path to your mirrored module
 */

module.exports = (pathname, replace = '/test') => Path.resolve(pathname).replace(replace, '');
