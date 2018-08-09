const flatten = (arr, depth=1) => {

    while (depth) {

        --depth;
        arr = arr.reduce((acc, cur) => acc.concat(cur), []);
    }

    return arr
};

module.exports = flatten;
