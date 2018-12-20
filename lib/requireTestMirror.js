

const TestMirrorPath = require('./testMirrorPath');

/*
 * Requires a module from root folder mirrored in /test
 * @function
 * @param {string} pathname - Path to require plugin from
 * @param {string} replace - Path to replace, in case your path is not '/test'. Optional
 * @return {module} The mirrored module
 */

module.exports = (pathname, replace = '/test') => require(TestMirrorPath(pathname, replace));
