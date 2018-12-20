const RequireNameMethod = require('./requireNameMethod');

const reducer = (acc, val) => {

    acc[val.name] = val.method;

    return acc;
};

/*
 * Requires all js modules in `dirname` and maps as Hapi methods array
 * @function
 * @param {string} dirname - Path to require plugin from
 * @return {object} An object with in the format of `{ key: module }`
 */
module.exports = (dirname) => RequireNameMethod(dirname).reduce(reducer, {});
