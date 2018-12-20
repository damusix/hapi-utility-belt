// NPM Modules
const Lab  = require('lab');
const Code = require('code');

// App Modules
const RequireAndFlatten = require('../../lib/requireAndFlatten');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;


lab.experiment('RequireAndFlatten',  () => {

    lab.test('it should be a function', () => {

        expect(RequireAndFlatten).to.be.a.function();
    });

    lab.test('it requires files and flattens them into an array', () => {

        const items = RequireAndFlatten(__dirname + '/../fixture');

        expect(items).to.include([1, 2, 3, 'a', 'b', 'c']);
        expect(items).to.include([
            { name: 'flat' },
            { name: 'fldr' },
            { name: 'test' },
            { name: 'tist' },
            { name: 'tast' }
        ]);
    });
});
