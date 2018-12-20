const Assert = require('assert');
const Confidence = require('confidence');

/*
 * Object store based on Confidence with preset environment critera
 * @class
 * @param {props} object - Array of arrays and mixed values
 * @param {number} depth - Array flattening depth
 * @return {array} A flattened array
 */
module.exports = class Confidant {

    constructor(props, criteria = {}) {

        Assert(props.constructor === Object, 'props must be an object');
        Assert(criteria.constructor === Object, 'criteria must be an object');

        this.store = new Confidence.Store(props);

        // Base criteria
        this.criteria = Object.assign({

            env: process.env.NODE_ENV || 'development'
        }, criteria);
    }


    get(key) {

        return this.store.get(key, this.criteria);
    }

    meta(key) {

        return this.store.meta(key, this.criteria);
    }


    // Extends criteria
    setCriteria(obj = {}) {

        Assert(obj.constructor === Object, 'criteria must be an object');

        Object.assign(this.criteria, obj);
    }

};
