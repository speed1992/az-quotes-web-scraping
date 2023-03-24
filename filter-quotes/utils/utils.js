var path = require("path");
const json2xls = require("json2xls");
var fse = require("fs-extra");
const { FILTERS } = require("../constants/constants");
const { removeSimilarQuotes } = require("./compareUtils");
const outputDirPath = path.resolve("filter-quotes/output");

let reportLog = [];

function isFilterPresentInQuote(quoteObj, filterString) {
  var quote = quoteObj.quote;

  if (quote.indexOf(filterString) > -1) {
    reportLog.push({ quote, filterString });
    return true;
  }
  return false;
}

function filterQuotes(myQuotes, filterArray, fileName) {
  var filteredQuotes = [];
  let filterFound = false;

  loop1: for (let i = 0; i < myQuotes.length; i++) {
    filterFound = false;
    loop2: for (let j = 0; j < filterArray.length; j++) {
      if (isFilterPresentInQuote(myQuotes[i], filterArray[j])) {
        filterFound = true;
        break loop2;
      }
    }
    if (!filterFound) filteredQuotes.push(myQuotes[i]);
  }
  console.log(reportLog.length, "quotes filtered");
  var xls = json2xls(reportLog);
  fse.outputFileSync(
    path.resolve(
      `filter-quotes/output/reports/${path.parse(fileName).name}.xlsx`
    ),
    xls,
    "binary"
  );
  reportLog = [];
  return filteredQuotes;
}

function removeFilters(filename, inputDirPath) {
  fse.readFile(
    inputDirPath + "/" + filename,
    "utf8",
    async function (err, data) {
      if (err) throw err;
      quotes = JSON.parse(data);
      let filteredQuotes = [];
      if (quotes !== undefined) {
        const filters = FILTERS.languageFilters;
        console.log(quotes.length, "quotes found in", filename);
        filteredQuotes = filterQuotes(quotes, filters, filename);
        filteredQuotes = removeSimilarQuotes(filteredQuotes, filename);
      }

      fse.outputFile(
        outputDirPath + "/" + filename,
        JSON.stringify(filteredQuotes),
        (err) => {
          if (err) console.log(err);
          else {
            console.log(filename, "file written successfully");
          }
        }
      );
    }
  );
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
