var fse = require('fs-extra');
const minify = require('node-json-minify')
const { STATIC_SUBSTRING1, STATIC_SUBSTRING2 } = require("../constants/constants")

const writeToFile = (json, { philosopherNameInSelector = null, varName }, MODULE_NAME, customContentToggle = false) => {
    const philosopher = `${varName.toLowerCase()}.json`
    const outputPath = `${MODULE_NAME}/output/${philosopher}`

    let content;
    if (customContentToggle)
        content = `${STATIC_SUBSTRING1}${varName.toUpperCase()}${STATIC_SUBSTRING2}${minify(json)}`
    else
        content = `${minify(json)}`

    return fse.outputFileSync(outputPath, content, err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`The file ${philosopher} was saved!`);
        }
    })
}

module.exports.writeToFile = writeToFile;