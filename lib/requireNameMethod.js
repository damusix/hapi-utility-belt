'use strict';

const Path = require('path');
const Fs = require('fs');
const requireNameModule = require('./requireNameModule');

/*
 * Requires all js modules in `dirname` and maps as Hapi methods array
 * @function
 * @param {string} dirname - Path to require plugin from
 * @return {array} An array of { name, method }
 */
module.exports = (dirname) => {

    return Ls(dirname)
        .map((file) => {

            const stat = Fs.statSync(file);

            if (stat.isFile() && /\.js/.test(file)) {

                return {
                    name: file.split('.')[0],
                    method: require(Path.resolve(dirname, file))
                }
            }

            if (stat.isDirectory()) {

                if (Fs.readfileSync(Path.resolve(dirname, file, 'index.js'))) {

                    return {
                        name: file.split('.')[0],
                        method: require(Path.resolve(dirname, file))
                    }
                }
            }

            return undefined;
        }).filter(file => file !== undefined);
};
