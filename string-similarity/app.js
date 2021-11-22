const { copyFilesIntoInputFolder, removeSimilarQuotes } = require("./utils/utils");

function start() {
    console.log("String similarity process started.");

    copyFilesIntoInputFolder();
    removeSimilarQuotes();

}


// find disimilarities 

// remove disimilarities

// write to the same 

module.exports.start = start;