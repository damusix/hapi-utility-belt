'use strict';

const Assert = require('assert');
const Confidence = require('confidence');

// Base criteria
const criteria = {

    env: process.env.NODE_ENV || 'development'
}

module.exports = class Config {

    constructor(props) {

        this.store = new Confidence.Store(props);
    }


    get(key) {

        return this.store.get(key, this.criteria);
    }

    meta(key) {

        return this.store.meta(key, this.criteria);
    }


    // Extends criteria
    static setCriteria(obj={}) {

        Assert(obj.constructor === Object, 'criteria must be an object');

        Object.assign(criteria, obj);
    }

};
