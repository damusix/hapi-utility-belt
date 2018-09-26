'use strict';


const Fs = require('fs');
const Path = require('path');

/*
 * Deletes files recursively
 * @function
 * @param {array} path - Path to start deleting from
 */
module.exports = (path) => {

    if (fs.existsSync(path)) {

        fs.readdirSync(path).forEach((file) => {

            const curPath = path + "/" + file;

            // recurse
            if(fs.statSync(curPath).isDirectory()) {

                utils.deleteRecursive(curPath);
            }
            else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
