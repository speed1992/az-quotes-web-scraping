var fse = require('fs-extra');
const { STATIC_SUBSTRING1, STATIC_SUBSTRING2 } = require("../constants/constants")

const writeToFile = (json, { philosopherNameInSelector = null, varName }, MODULE_NAME, customContentToggle) => {

    const philosopher = `${varName.toLowerCase()}.js`
    const outputPath = `${MODULE_NAME}/output/${philosopher}`

    let content;
    if (customContentToggle)
        content = `${STATIC_SUBSTRING1}${varName.toUpperCase()}${STATIC_SUBSTRING2}${JSON.stringify(json, null, 4)}`
    else
        content = `${JSON.stringify(json, null, 4)}`

    return fse.outputFileSync(outputPath, content, err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`The file ${philosopher} was saved!`);
        }
    })
}

module.exports.writeToFile = writeToFile;