const { start: pullQuotesFromAZQuotes } = require("./azquotes/app");
const { start: combineOutputs } = require("./combine-output/app");
const { start: pullQuotesFromGoodreads } = require("./goodreads/app");
const { deleteOutputDirectories } = require("./delete-clear-outputs/app");
const {
  start: makeConstantsFileForQuotesRepo,
} = require("./convert-constants-json/app");
const {
  start: addIdsToTheCombinedOutput,
} = require("./add-ids-to-outputs/app");
const {
  start: filterSanitizeQuotations,
} = require("./filter-quotes-output/app");

(async function () {
  await deleteOutputDirectories([
    "azquotes",
    "goodreads",
    "combine-output",
    "convert-constants-json",
    "add-ids-to-outputs",
    "filter-quotes-output",
  ]);
  await pullQuotesFromAZQuotes();
  await pullQuotesFromGoodreads();
  await combineOutputs();
  await makeConstantsFileForQuotesRepo();
  await addIdsToTheCombinedOutput();
  setTimeout(async () => {
    await filterSanitizeQuotations();
  }, 2000);

  console.log(`Two outputs generated:
    1. convert-constants-json/output/converted_constants.json
    2. filter-quotes-output/output`);
})();

function errorHandler(error) {
  console.log(error);
}

process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
process.on("SIGTERM", errorHandler);
process.on("SIGINT", errorHandler);
