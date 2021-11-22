const { start: pullQuotesFromAZQuotes } = require("./azquotes/app");
const { start: combineOutputs } = require("./combine-output/app");
const { start: copyFilesIntoInputFolder } = require("./string-similarity/app");
const { start: pullQuotesFromGoodreads } = require("./goodreads/app");

(async function () {
    // await pullQuotesFromAZQuotes();
    // await pullQuotesFromGoodreads();
    // await combineOutputs();
    copyFilesIntoInputFolder();
})();