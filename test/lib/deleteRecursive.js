// NPM Modules
const Lab  = require('lab');
const Code = require('code');
const Fs = require('fs');


// App Modules
const DeleteRecursive = require('../../lib/deleteRecursive');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;

const tmpfolder = __dirname + '/../../tmp';

try {
    Fs.mkdirSync(tmpfolder + '');
}
catch (e) {}

let hierarchy = '';
['test', 'tast', 'tits'].forEach((name) => {

    hierarchy = [hierarchy, name].join('/');
    try {

        Fs.mkdirSync(tmpfolder + hierarchy);
    }
    catch (e) {}

    try {
        const file = Fs.openSync(tmpfolder + hierarchy + '.txt', 'w');

        Fs.closeSync(file);
    }
    catch (e) {}
});

lab.experiment('DeleteRecursive',  () => {

    lab.test('it should be a function', () => {

        expect(DeleteRecursive).to.be.a.function();
    });

    lab.test('it should delete created folders', () => {

        DeleteRecursive(tmpfolder);

        try {

            const stat = Fs.statSync(tmpfolder);
            expect(stat).to.not.exist();
        }
        catch (e) {

            expect(e).to.be.an.error();
            expect(e.message).to.match(/no such file or directory/);
        }
    });
});
