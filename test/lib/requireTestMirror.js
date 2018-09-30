// NPM Modules
const Lab  = require('lab');
const Code = require('code');
const Confidence = require('confidence');

// App Modules
const RequireTestMirror = require('../../lib/requireTestMirror');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;

const stub = {};


lab.experiment('RequireTestMirror',  () => {

    lab.test('it should be a function', () => {

        expect(RequireTestMirror).to.be.a.function();
    });

    lab.test('it should require the file or directory without the test path', () => {

        const mirror = RequireTestMirror(__filename)
        expect(mirror).to.be.a.function();
        expect(mirror).to.equal(RequireTestMirror);
    });
});
