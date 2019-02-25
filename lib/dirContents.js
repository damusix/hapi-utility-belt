

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

            const filename = file.split('.')[0];
            const filePath = Path.resolve(dirname, file);
            const stat = Fs.statSync(filePath);


            let keyName = filename;

            if (parentName) {

                keyName = [parentName, filename].join('-');
            }

            if (stat.isFile()) {

                const content = Fs.readFileSync(filePath).toString();

                contents[keyName] = content;
            }

            if (stat.isDirectory()) {

                const recursiveContents = dirContents(filePath, keyName, contents);
                Object.assign(contents, recursiveContents);
            }


        });

    return contents;
};

module.exports = dirContents;
