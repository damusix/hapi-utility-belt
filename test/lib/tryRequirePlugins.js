// NPM Modules
const Lab  = require('lab');
const Code = require('code');
const Confidence = require('confidence');

// App Modules
const TryRequirePlugins = require('../../lib/tryRequirePlugins');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;

const stub = {};


lab.experiment('TryRequirePlugins',  () => {

    lab.test('it should be a function', () => {

        expect(TryRequirePlugins).to.be.a.function();
    });

    lab.test('it should attempt to require hapi plugins even if not exist', () => {

        const plugins = TryRequirePlugins([
            { plugin: 'code', options: {} },
            { plugin: 'blipp', options: {} },
            { plugin: 'confidence', options: {} },
        ]);

        expect(plugins.length).to.equal(2);
        expect(plugins[0].plugin).to.equal(Code);
        expect(plugins[1].plugin).to.equal(Confidence);
    });
});
