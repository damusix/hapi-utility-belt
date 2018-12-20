

const Path = require('path');
const Fs = require('fs');

/*
 * Reads contents from all files in `dirname` and maps as key: value pairs
 * @function
 * @param {string} dirname - Path to require plugin from
 * @param {string} parentName - Name of folder being recursively read
 * @param {object} parentContent - Parent content object to attach objects recursively
 * @return {object} An object of { filename: fileContents }
 */
const dirContents = (dirname, parentName, parentContent = {}) => {

    const contents = {};

    Fs.readdirSync(dirname)
        .forEach((file) => {

            const filePath = Path.resolve(dirname, file);
            const stat = Fs.statSync(filePath);

            if (stat.isFile()) {

                const filename = file.split('.')[0];
                const content = Fs.readFileSync(filePath).toString();

                let keyName = filename;

                if (parentName) {

                    keyName = [parentName, filename].join('-');
                }

                contents[keyName] = content;
            }

            if (stat.isDirectory()) {

                const recursiveContents = dirContents(filePath, file, contents);
                Object.assign(contents, recursiveContents);
            }

        });

    return contents;
};

module.exports = dirContents;
