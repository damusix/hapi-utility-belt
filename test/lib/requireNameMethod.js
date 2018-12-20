// NPM Modules
const Lab  = require('lab');
const Code = require('code');

// App Modules
const RequireNameMethod = require('../../lib/requireNameMethod');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;


lab.experiment('RequireNameMethod',  () => {

    lab.test('it should be a function', () => {

        expect(RequireNameMethod).to.be.a.function();
    });

    lab.test('it requires files into an { name: key, method: value } format', () => {

        const items = RequireNameMethod(__dirname + '/../fixture');

        expect(items[0].name).to.equal('flat');
        expect(items[0].method).to.include({ name: 'flat' });
        expect(items[1].name).to.equal('fldr');
        expect(items[1].method).to.equal({ name: 'fldr' });
        expect(items[2].name).to.equal('tast');
        expect(items[2].method).to.equal({ name: 'tast' });
        expect(items[3].name).to.equal('test');
        expect(items[3].method).to.equal({ name: 'test' });
        expect(items[4].name).to.equal('tist');
        expect(items[4].method).to.equal({ name: 'tist' });

    });
});
