// NPM Modules
const Lab  = require('lab');
const Code = require('code');
const Confidence = require('confidence');

// App Modules
const RequireFiles = require('../../lib/requireFiles');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;

const stub = {};


lab.experiment('RequireFiles',  () => {

    lab.test('it should be a function', () => {

        expect(RequireFiles).to.be.a.function();
    });

    lab.test('it requires files into an { key: value } format', () => {

        const items = RequireFiles(__dirname + '/../fixture');

        expect(items).to.include(['flat', 'fldr', 'tast', 'test', 'tist']);

        expect(items.flat[0].name).to.equal('flat');
        expect(items.fldr.name).to.equal('fldr');
        expect(items.tast.name).to.equal('tast');
        expect(items.test.name).to.equal('test');
        expect(items.tist.name).to.equal('tist');

    });
});
