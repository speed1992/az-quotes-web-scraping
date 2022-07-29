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
const inputDirPath = path.resolve("../combine-output/output")
const outputDirPath = path.resolve("./output")

const walker = walk.walk(inputDirPath);

walker.on('file', function (root, fileStats, next) {
    fse.readFile(inputDirPath + "/" + fileStats.name, 'utf8', function (err, data) {
        if (err) throw err;
        quotes = JSON.parse(data);
        if (quotes !== undefined) {
            var newJSON = [];
            quotes.forEach((element,index)=>{
                var obj = {id: index+1, quote:element}
                newJSON.push(obj);
            })
        }


        fse.outputFile(outputDirPath + "/" + fileStats.name, JSON.stringify(newJSON), (err) => {
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