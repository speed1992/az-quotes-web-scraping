const { start: pullQuotesFromAZQuotes } = require("./azquotes/app");
const { start: combineOutputs } = require("./combine-output/app");
const { start: pullQuotesFromGoodreads } = require("./goodreads/app");
const { deleteOutputDirectories } = require("./delete-clear-outputs/app");
const { start: makeConstantsFileForQuotesRepo } = require("./convert-constants-json/app");

(async function () {
    await deleteOutputDirectories(["azquotes", "goodreads", "combine-output", "convert-constants-json"])
    await pullQuotesFromAZQuotes();
    await pullQuotesFromGoodreads();
    combineOutputs();
    await makeConstantsFileForQuotesRepo();
})();

function errorHandler(error) {
    console.log(error);
}

process.on('uncaughtException', errorHandler)
process.on('unhandledRejection', errorHandler)
process.on('SIGTERM', errorHandler)
process.on('SIGINT', errorHandler)