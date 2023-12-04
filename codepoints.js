const path = require('path');
const { promises: fs } = require("fs");
let content;

// Configuration file
const params = '.fantasticonrc.js';
// Icons folder
const iconsPath = path.join(__dirname, 'icons');

const run = async () => {
    let data;

    // Read configuration file
    try {
        data = await fs.readFile(params, 'utf8');
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', `Automatic generation of codepoints was not successful.\nThe ${params} configuration file does not seem to exist..`);
        return process.exit(1);
    }

    console.log('\x1b[32m%s\x1b[0m', `✔ Found ${params} file.`);

    // Update configuration file
    try {
        if (data.startsWith("module.exports = {") && data.endsWith("};")) {
            // Get the JSON content as JSON file
            let rawData = data.substring(17, data.length - 1);
            content = JSON.parse(rawData);

            if (!content || !content.codepoints) {
                throw new Error(`The contents of the ${params} file appear to be invalid.`);
            }

            // Get last ID
            let maxID;
            try {
                maxID = Object.entries(content.codepoints).reduce((a, b) => a[1] > b[1] ? a : b)[1];
            } catch (err) {
                throw new Error(`You must fill in at least one entry in the endpoints node ("svg-name":XXXXXX) in the ${params} file.`);
            }

            let iconsFiles;

            try {
                iconsFiles = await fs.readdir(iconsPath);
            } catch (err) {
                throw new Error('Icons folder not found.');
            }

            console.log('\x1b[32m%s\x1b[0m', `✔ Found ${iconsPath} folder.`);

            iconsFiles.forEach(function (file) {
                // Get icon name and increment ID if not already in the list
                let iconName = file.substring(0, file.lastIndexOf("."));
                if (!Object.keys(content.codepoints).includes(iconName)) {
                    maxID += 1
                    content.codepoints[iconName] = maxID;
                }
            });

            await fs.rename(params, params + '.bak');

            console.log('\x1b[32m%s\x1b[0m', `✔ Create ${params}.bak backup.`);

            // Generate new configuration file
            let text = "module.exports = " + JSON.stringify(content, null, 4) + ";"
            await fs.writeFile(params, text, { flag: 'w+' })

            console.log('\x1b[32m%s\x1b[0m', `✔ Update ${params} with new codepoints.`);

            return process.exit(0);
        }
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', `The automatic generation of codepoints was not successful.\n${e}`);
        return process.exit(1);
    }
}

run()