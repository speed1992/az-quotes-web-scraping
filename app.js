const { start: pullQuotesFromAZQuotes } = require("./azquotes/app");
const { start: combineOutputs } = require("./combine-output/app");
const { start: removeDuplicateQuotes } = require("./string-similarity/app");
const { start: pullQuotesFromGoodreads } = require("./goodreads/app");
const { deleteOutputDirectories } = require("./delete-clear-outputs/app");

(async function () {
    await deleteOutputDirectories(["azquotes", "goodreads", "combine-output"])
    await pullQuotesFromAZQuotes();
    await pullQuotesFromGoodreads();
    console.log("Combining process started.")
    combineOutputs();
})();


function errorHandler(error) {
    console.log(error);
}

process.on('uncaughtException', errorHandler)
process.on('unhandledRejection', errorHandler)
process.on('SIGTERM', errorHandler)
process.on('SIGINT', errorHandler)