const { copyFilesIntoInputFolder, removeSimilarQuotes } = require("./utils/utils");

function start() {
    console.log("String similarity process started.");

    copyFilesIntoInputFolder();
    removeSimilarQuotes(0);
    /*  
    ***dissimilarity coefficient***
    
    Dice-Coeff : if it is one (1) 
    then string is totally similar
    
    Levenstein : distance 0 - totally similar
    
*/

}


// find disimilarities 

// remove disimilarities

// write to the same 

module.exports.start = start;