'use strict';

const requireFiles = require('./requireFiles');
const flatten = require('./flatten');

/*
 * Requires all modules in `dirname` and flattens them
 * @function
 * @param {string} dirname - Path to require plugin from
 * @return {array} An array of required modules
 */
module.exports = (dirname) => flatten(Object.values(requireFiles(dirname)));
