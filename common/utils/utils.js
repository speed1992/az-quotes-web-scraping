var fse = require('fs-extra');
const { STATIC_SUBSTRING1, STATIC_SUBSTRING2 } = require("../constants/constants")

const writeToFile = (json, { philosopherNameInSelector, varName }, MODULE_NAME) => {

    const philosopher = `${philosopherNameInSelector}/${philosopherNameInSelector.toLowerCase()}.js`
    const outputPath = `${MODULE_NAME}/output/${philosopher}`
    const content = `${STATIC_SUBSTRING1}${varName}${STATIC_SUBSTRING2}${JSON.stringify(json, null, 4)}`

    return fse.outputFile(outputPath, content, err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`The file ${philosopher} was saved!`);
        }
    })
}

module.exports.writeToFile = writeToFile;