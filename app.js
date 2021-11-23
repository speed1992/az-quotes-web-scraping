const { start: pullQuotesFromAZQuotes } = require("./azquotes/app");
const { start: combineOutputs } = require("./combine-output/app");
const { start: removeDuplicateQuotes } = require("./string-similarity/app");
const { start: pullQuotesFromGoodreads } = require("./goodreads/app");

(async function () {
    await pullQuotesFromAZQuotes();
    await pullQuotesFromGoodreads();
    console.log("Combining process started.")
    combineOutputs();

    // copyFilesIntoInputFolder();
    // removeDuplicateQuotes();
})();


// function errorHandler(error) {
//     console.log(error);
// }

// process.on('uncaughtException', errorHandler)
// process.on('unhandledRejection', errorHandler)
// process.on('SIGTERM', errorHandler)
// process.on('SIGINT', errorHandler)