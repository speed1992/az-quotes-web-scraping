// remove puncuation from constant filters
// Remove all urdu quotes
// Remove all single words
// Remove spanish quotes
// Remove Russian quotes
// remove empty quotes
// remove one word quotes
// remove punctuation, toLowercase, trim() then compare and remove duplicates
// remove undefined quotes

var path = require('path');
var walk = require('walk');
var fse = require('fs-extra');
const { removeDuplicateQuotes } = require('./utils/utils');
const { filterQuotes } = require('./utils/filterUtils');
const { splitFilters } = require('./utils/utils');
const inputDirPath = path.resolve("../combine-output/output")
const outputDirPath = path.resolve("./output")

const walker = walk.walk(inputDirPath);

walker.on('file', function (root, fileStats, next) {
    fse.readFile(inputDirPath + "/" + fileStats.name, 'utf8', function (err, data) {
        if (err) throw err;
        quotes = JSON.parse(data);
        let filteredQuotes = []
        if (quotes !== undefined) {
            const filters = splitFilters();
            filteredQuotes = filterQuotes(quotes,filters,fileStats.name)
        }


        fse.outputFile(outputDirPath + "/" + fileStats.name, JSON.stringify(filteredQuotes), (err) => {
            if (err)
                console.log(err);
            else {
                console.log(fileStats.name, " file written successfully");
            }
        });


        next()
    });
});

walker.on('errors', function (root, nodeStatsArray, next) {
    next();
});

walker.on('end', function () {
    console.log('all done');
});