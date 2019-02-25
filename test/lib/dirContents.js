// NPM Modules
const Lab  = require('lab');
const Code = require('code');

// App Modules
const DirContents = require('../../lib/dirContents');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;


lab.experiment('DirContents',  () => {

    lab.test('it should be a function', () => {

        expect(DirContents).to.be.a.function();
    });

    lab.test('it reads files and places their contents into an object recursively', () => {

        const items = DirContents(__dirname + '/../fixture');

        expect(items).to.include(['tast', 'test', 'tist']);
        expect(items.tast).to.equal('module.exports = { name: \'tast\' };\n');
        expect(items.test).to.equal('module.exports = { name: \'test\' };\n');
        expect(items.tist).to.equal('module.exports = { name: \'tist\' };\n');

        expect(items).to.include(['flat-index', 'fldr-index', 'fldr-fldrer-fldrerest-goal']);
        expect(items['fldr-fldrer-fldrerest-goal']).to.equal('<h1>success!</h1>');
    });
});
