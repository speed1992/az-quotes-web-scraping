const fse = require('fs-extra')
const klaw = require('klaw')
const through2 = require('through2')
const path = require("path");

let inputPath = "../../combine-output/output";

inputPath = path.resolve(__dirname, inputPath);

let outputPath = "../output";

outputPath = path.resolve(__dirname, outputPath)

function getAllFiles() {

    const excludeDirFilter = through2.obj(function (item, enc, next) {
        if (!item.stats.isDirectory()) this.push(item)
        next()
    })

    const items = [] // files, directories, symlinks, etc

    klaw(inputPath)
        .pipe(excludeDirFilter)
        .on('data', item => items.push(item.path))
        .on('end', () => console.dir(items)) // => [ ... array of files without directories]

    return items;
}

function copyFilesIntoInputFolder() {
    const fileNames = getAllFiles();

    fileNames.forEach((value) => {
        fse.copy(value, `${outputPath}/${path.basename(value)}`)
            .then(() => console.log(path.basename(value), 'success!'))
            .catch(err => console.error(err))
    })

}

module.exports.copyFilesIntoInputFolder = copyFilesIntoInputFolder;
module.exports.getAllFiles = getAllFiles;