// Remove all urdu quotes
// Remove all single words
// Remove spanish quotes
var path = require('path');
var walk = require('walk');
var fs = require('fs');
const inputDirPath = path.resolve("../combine-output/output")

const walker = walk.walk(inputDirPath);

walker.on('file', function (root, fileStats, next) {
    fs.readFile(inputDirPath + "/" + fileStats.name, 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log(obj[0])
        next()
    });
});

walker.on('errors', function (root, nodeStatsArray, next) {
    next();
});

walker.on('end', function () {
    console.log('all done');
});