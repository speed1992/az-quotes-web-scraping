const { start: pullQuotesFromAZQuotes } = require("./azquotes/server");
const { start: pullQuotesFromGoodreads } = require("./goodreads/server");

(async function () {
    await pullQuotesFromAZQuotes();
    // await pullQuotesFromGoodreads();
})();