'use strict';


const Fs = require('fs');
const Path = require('path');

/*
 * Deletes files recursively
 * @function
 * @param {array} path - Path to start deleting from
 */
const deleteRecursive = (path) => {

    if (Fs.existsSync(path)) {

        Fs.readdirSync(path).forEach((file) => {

            const curPath = path + "/" + file;

            // recurse
            if(Fs.statSync(curPath).isDirectory()) {

                deleteRecursive(curPath);
            }
            else {
                // delete file
                Fs.unlinkSync(curPath);
            }
        });
        Fs.rmdirSync(path);
    }
};

module.exports = deleteRecursive
