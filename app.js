const { start: pullQuotesFromAZQuotes } = require("./azquotes/app");
const { start: combineOutputs } = require("./combine-output/app");
const { start: copyFilesIntoInputFolder } = require("./string-similarity/app");
const { start: pullQuotesFromGoodreads } = require("./goodreads/app");
const { removeSimilarQuotes } = require("./string-similarity/utils/utils");

(async function () {
    await pullQuotesFromAZQuotes();
    await pullQuotesFromGoodreads();
    console.log("Combining process started.")
    combineOutputs();
    
    copyFilesIntoInputFolder();
    removeSimilarQuotes();
})();


// function errorHandler(error) {
//     console.log(error);
// }

// process.on('uncaughtException', errorHandler)
// process.on('unhandledRejection', errorHandler)
// process.on('SIGTERM', errorHandler)
// process.on('SIGINT', errorHandler)