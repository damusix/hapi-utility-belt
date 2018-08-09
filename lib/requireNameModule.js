'use strict';

const Path = require('path');
const Ls = require('./lsWithoutIndex');

module.exports = (dirname) => {

    return Ls(dirname)
        .map((file) => ({
            name: file.split('.')[0],
            module: require(Path.resolve(dirname, file))
        }));
};
