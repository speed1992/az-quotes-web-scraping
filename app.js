// const { start: pullQuotesFromAZQuotes } = require("./azquotes/app");
// const { start: combineOutputs } = require("./combine-output/app");
// const { start: pullQuotesFromGoodreads } = require("./goodreads/app");
const { deleteOutputDirectories } = require("./delete-clear-outputs/app");
// const { start: makeConstantsFileForQuotesRepo } = require("./convert-constants-json/app");
// const { start: addIdsToTheCombinedOutput } = require("./add-ids-to-outputs/app");
const {
  start: filterSanitizeQuotations,
} = require("./filter-quotes-output/app");

(async function () {
  // await deleteOutputDirectories(["azquotes", "goodreads", "combine-output", "convert-constants-json", "add-ids-to-outputs"])
  // await pullQuotesFromAZQuotes();
  // await pullQuotesFromGoodreads();
  // combineOutputs();
  // await makeConstantsFileForQuotesRepo();
  // await addIdsToTheCombinedOutput();
  try {
    await deleteOutputDirectories(["filter-quotes-output"]);
  } catch (e) {}

  await filterSanitizeQuotations();

  // console.log(`Two outputs generated:
  //   1. convert-constants-json/output/converted_constants.json
  //   2. add-ids-to-outputs/output`);
})();

function errorHandler(error) {
  console.log(error);
}

process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
process.on("SIGTERM", errorHandler);
process.on("SIGINT", errorHandler);
