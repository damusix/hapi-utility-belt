// NPM Modules
const Lab  = require('lab');
const Code = require('code');

// App Modules
const LsWithoutIndex = require('../../lib/lsWithoutIndex');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;


lab.experiment('LsWithoutIndex',  () => {

    lab.test('it should be a function', () => {

        expect(LsWithoutIndex).to.be.a.function();
    });

    lab.test('it list folders and js files only without index.js', () => {

        const items = LsWithoutIndex(__dirname + '/../fixture');

        expect(items).to.include(['tast.js', 'test.js', 'tist.js', 'fldr']);
        expect(items).to.not.include(['index.js', 'ignore.php', 'ignore.py', 'ignore.rb']);
    });
});
