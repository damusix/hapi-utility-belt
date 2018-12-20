// NPM Modules
const Lab  = require('lab');
const Code = require('code');

// App Modules
const TestMirrorPath = require('../../lib/testMirrorPath');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;


lab.experiment('TestMirrorPath',  () => {

    lab.test('it should be a function', () => {

        expect(TestMirrorPath).to.be.a.function();
    });

    lab.test('it should return the file or directory path without the word "test"', () => {

        const mirror = TestMirrorPath(__filename);
        expect(mirror).to.be.a.string();

        expect(mirror).to.not.match(/\/test\//);
    });

    lab.test('it should return the file or directory path without a custom replacement', () => {

        const mirror = TestMirrorPath(__filename, '/lib/test');
        expect(mirror).to.be.a.string();

        expect(mirror).to.not.match(/\/test\//);
        expect(mirror).to.not.match(/\/lib\//);
    });
});
