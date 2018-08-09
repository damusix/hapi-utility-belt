'use strict';

const requireFiles = require('./requireFiles');
const flatten = require('./flatten');

module.exports = (dirname) => {

    flatten(Object.values(requireFiles(dirname)));
}
