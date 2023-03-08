var path = require("path");
var walk = require("walk");
var fse = require("fs-extra");
var Walk = require("@root/walk");
const { filterQuotes } = require("./filterUtils");
const inputDirPath = path.resolve("../../add-ids-to-outputs/output");
const outputDirPath = path.resolve("filter-quotes-output/output");
const { FILTERS } = require("../constants/constants");

function splitFilters() {
  let newFilters = [];

  FILTERS.languageFilters.forEach((filterSentence, index) => {
    const filtersAfterSplit = filterSentence.replace(/\s/g, "").split("");
    newFilters = [...newFilters, ...filtersAfterSplit];
  });

  return newFilters;
}

function removeFilters(filename, inputDirPath) {
  fse.readFile(inputDirPath + "/" + filename, "utf8", function (err, data) {
    if (err) throw err;
    quotes = JSON.parse(data);
    let filteredQuotes = [];
    if (quotes !== undefined) {
      console.log(filename);
      const filters = splitFilters();
      filteredQuotes = filterQuotes(quotes, filters, filename);
    }

    fse.outputFile(
      outputDirPath + "/" + filename,
      JSON.stringify(filteredQuotes),
      (err) => {
        if (err) console.log(err);
        else {
          console.log(filename, " file written successfully");
        }
      }
    );
  });
}

module.exports.walkFunc = function (err, pathname, dirent) {
  if (err) {
    console.warn("fs stat error for %s: %s", pathname, err.message);
    return Promise.resolve();
  }
  if (dirent.isFile()) {
    removeFilters(dirent.name, path.dirname(pathname));
  }
  return Promise.resolve();
};
