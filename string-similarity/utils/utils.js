const fse = require('fs-extra')
const klawSync = require('klaw-sync')
const through2 = require('through2')
const path = require("path");
const { compare } = require('./levAlgoUtils');

let inputPath = "../../combine-output/output";

inputPath = path.resolve(__dirname, inputPath);

let outputPath = "../input";

outputPath = path.resolve(__dirname, outputPath)

const parseOutput = (data) => JSON.parse(data);

function callback(err, data) {
    if (err) console.log(err);
    return data;
}

function getAllFiles(dirPath) {
    const result = klawSync(dirPath, { nodir: true })

    return result.map((value) => {
        return value.path
    })
}

function copyFilesIntoInputFolder() {
    const fileNames = getAllFiles(inputPath);
    fileNames.forEach((value) => {
        fse.copy(value, `${outputPath}/${path.basename(value)}`)
            .then(() => console.log(path.basename(value), 'copied!'))
            .catch(err => console.error(err))
    })


}

function removeSimilarQuotes() {
    const fileNames = getAllFiles(outputPath);

    fileNames.forEach((filePath) => {
        console.log(filePath)
        let quotes;

        let output = fse.readFileSync(filePath, "utf8", callback)

        if (output != undefined && output)
            quotes = parseOutput(output);

        compare(quotes);

    })

}

module.exports.removeSimilarQuotes = removeSimilarQuotes;
module.exports.copyFilesIntoInputFolder = copyFilesIntoInputFolder;
module.exports.getAllFiles = getAllFiles;