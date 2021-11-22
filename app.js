const { start: pullQuotesFromAZQuotes } = require("./azquotes/server");
const { start } = require("./combine-output/app");
const { start: pullQuotesFromGoodreads } = require("./goodreads/server");

(async function () {
    await pullQuotesFromAZQuotes();
    // await pullQuotesFromGoodreads();
    await start();
})();