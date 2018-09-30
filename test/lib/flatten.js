// NPM Modules
const Lab  = require('lab');
const Code = require('code');
const Confidence = require('confidence');

// App Modules
const Flatten = require('../../lib/flatten');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;

const stub = {};


lab.experiment('Flatten',  () => {

    lab.test('it should be a function', () => {

        expect(Flatten).to.be.a.function();
    });

    lab.test('it only accepts an array', () => {

        try {

            const f = Flatten({});
            expect(f).to.not.exist();
        }
        catch (e) {

            expect(e).to.be.an.error();
            expect(e.message).to.match(/must be an array/);
        }
    });

    lab.test('it only accepts an number as depth', () => {

        try {

            const f = Flatten([1,2], 'a');
            expect(f).to.not.exist();
        }
        catch (e) {

            expect(e).to.be.an.error();
            expect(e.message).to.match(/must be an number/);
        }
    });

    lab.test('it flatten an array 1 level deep', () => {

        const arr = [[1], [2], [[3]]];
        const flat = Flatten(arr);

        expect(flat[0]).to.equal(1);
        expect(flat[1]).to.equal(2);
        expect(flat[2]).to.equal([3]);
    });

    lab.test('it flatten an array N levels deep', () => {

        let arr = [[1], [2], [[3]], [[[4]]]];
        let flat = Flatten(arr, 2);

        expect(flat[0]).to.equal(1);
        expect(flat[1]).to.equal(2);
        expect(flat[2]).to.equal(3);
        expect(flat[3]).to.equal([4]);

        arr = [[1], [2], [[3]], [[[4]]]];
        flat = Flatten(arr, 3);

        expect(flat[0]).to.equal(1);
        expect(flat[1]).to.equal(2);
        expect(flat[2]).to.equal(3);
        expect(flat[3]).to.equal(4);
    });

});
