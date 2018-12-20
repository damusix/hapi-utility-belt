// NPM Modules
const Lab  = require('lab');
const Code = require('code');
const Fs = require('fs');

// App Modules
const Index = require('..');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;

lab.experiment('Index File',  () => {

    lab.test('it should contain keys of files in /lib', () => {

        expect(Index).to.be.an.object();

        Fs.readdirSync(__dirname + '/../lib').forEach((filename) => {

            const name = filename.split('.')[0];

            expect(Index[name]).to.exist();
            expect(Index[name]).to.be.a.function();
        });
    });
});

