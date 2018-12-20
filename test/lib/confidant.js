// NPM Modules
const Lab  = require('lab');
const Code = require('code');
const Confidence = require('confidence');

// App Modules
const Confidant = require('../../lib/confidant');

// Module Variables
const lab = exports.lab = Lab.script();
const expect = Code.expect;


lab.experiment('Confidant',  () => {

    lab.test('it should be a function', () => {

        expect(Confidant).to.be.a.function();
    });

    lab.test('it should require instantiation', () => {

        try {

            const conf = Confidant({ test: true });
            expect(conf).to.not.exist();
        }
        catch (e) {

            expect(e).to.be.an.error();
            expect(e.message).to.match(/cannot be invoked without \'new\'/);
        }
    });

    lab.test('it should instantiate a new object store with env criteria', () => {

        const conf = new Confidant({
            test: {
                $filter: 'env',
                development: true,
                test: false,
                $default: '1'
            }
        });

        expect(conf).to.be.an.object();
        expect(conf.store).to.be.an.object();
        expect(conf.store).to.be.an.instanceof(Confidence.Store);
        expect(conf.criteria).to.be.an.object();
        expect(conf.setCriteria).to.be.a.function();
        expect(conf.get).to.be.a.function();
        expect(conf.meta).to.be.a.function();

        expect(conf.get('/test')).to.be.false();
        expect(conf.criteria.env).to.equal('test');
    });

    lab.test('it should accept a criteria', () => {

        const conf = new Confidant({
            test: {
                $filter: 'env',
                development: true,
                test: false,
                $default: '1'
            },
            lastName: {
                $filter: 'user',
                pepe: 'billete',
                papa: 'lote'
            }
        }, {

            user: 'pepe'
        });

        expect(conf.criteria.env).to.equal('test');
        expect(conf.criteria.user).to.equal('pepe');

        expect(conf.get('/test')).to.be.false();
        expect(conf.get('/lastName')).to.equal('billete');
    });

    lab.test('it should update a criteria', () => {

        const conf = new Confidant({
            test: {
                $filter: 'env',
                development: true,
                test: false,
                $default: '1'
            },
            lastName: {
                $filter: 'user',
                pepe: 'billete',
                papa: 'lote'
            }
        }, {

            user: 'pepe'
        });

        expect(conf.criteria.user).to.equal('pepe');

        expect(conf.get('/test')).to.be.false();
        expect(conf.get('/lastName')).to.equal('billete');

        conf.setCriteria({ user: 'papa' });

        expect(conf.criteria.user).to.equal('papa');

        expect(conf.get('/lastName')).to.equal('lote');
    });
});

