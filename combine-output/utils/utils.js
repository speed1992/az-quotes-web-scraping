const fse = require('fs-extra');
const path = require("path");

const { MODULE_NAME: module1 } = require("../../azquotes/constants/constants");
const { MODULE_NAME: module2 } = require("../../goodreads/constants/constants");

const { PHILOSOPHERS_DATA } = require("../../common/constants/constants");
const { writeToFile } = require('../../common/utils/utils');

const modules = [module1, module2];

function callback(err, data) {
    if (err) console.log(err);
    return data;
}

const parseOutput = (data) => JSON.parse(data);

function readFileFromAllModules() {
    return new Promise(function (resolve, _) {

        for (let i = 0; i < PHILOSOPHERS_DATA.length; i++) {
            const varName = PHILOSOPHERS_DATA[i].varName.toLowerCase();
            let combinedOutput = [];

            for (let j = 0; j < modules.length; j++) {
                let output;
                const inputPath = `../../${modules[j]}/output/${varName}.js`
                try {
                    output = fse.readFileSync(path.resolve(__dirname, inputPath), "utf8", callback)
                    if (typeof output != undefined && output)
                        combinedOutput = [...combinedOutput, ...(parseOutput(output))];
                } catch (e) {
                    console.log(e)
                }

            }

            writeToFile(combinedOutput, { varName }, "combine-output", true)

        }
        resolve()
    });

}

module.exports.readFileFromAllModules = readFileFromAllModules;