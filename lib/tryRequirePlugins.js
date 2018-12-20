

const Assert = require('assert');

/*
 * Attempts to require a Hapi plugin
 * @function
 * @param {array} plugins - Array of Hapi plugin objects
 * @return {array} An array of Hapi plugins with module required
 */

module.exports = (plugins) => {

    Assert(plugins instanceof Array, 'must pass and array of plugins');

    const modules = [];

    plugins.forEach((obj) => {

        try {

            Assert(obj instanceof Object, 'plugin must be an object');

            const { plugin, options } = obj;

            Assert(options instanceof Object, 'plugin.options must be an object');
            Assert(typeof plugin === 'string', 'plugin.plugin must be a string');

            modules.push({
                options,
                plugin: require(plugin)
            });
        }
        catch (e) {

            console.log('\n', e.message);
        }
    });

    return modules;
};
