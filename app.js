const { start: pullQuotesFromAZQuotes } = require("./azquotes/server");
const { start: combineOutputs } = require("./combine-output/app");
const { start: copyFilesIntoInputFolder } = require("./string-similarity/app");
const { start: pullQuotesFromGoodreads } = require("./goodreads/app");

(async function () {
    // await pullQuotesFromAZQuotes();
    // await pullQuotesFromGoodreads();
    await combineOutputs();
    await copyFilesIntoInputFolder();
})();