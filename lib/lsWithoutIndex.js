'use strict';


const Fs = require('fs');
const Path = require('path');

/*
 * Lists all files in a path except `index.js`
 * @function
 * @param {string} dirname - Path to list files
 * @return {array} An array of paths except `index.js`
 */
module.exports = (dirname) => {
    return Fs.readdirSync(dirname)
    .filter((f) => f !== 'index.js');
};
