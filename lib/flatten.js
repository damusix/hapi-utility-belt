

const Assert = require('assert');


/*
 * Flattens an array `depth` levels deep
 * @function
 * @param {array} arr - Array of arrays and mixed values
 * @param {number} depth - Array flattening depth
 * @return {array} A flattened array
 */
const flatten = (arr, depth = 1) => {

    Assert(arr instanceof Array, 'must be an array');
    Assert(typeof depth === 'number', 'must be an number');

    while (depth) {

        --depth;
        arr = arr.reduce((acc, cur) => acc.concat(cur), []);
    }

    return arr;
};

module.exports = flatten;
