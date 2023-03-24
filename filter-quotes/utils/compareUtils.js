const json2xls = require("json2xls");
var fse = require("fs-extra");
var path = require("path");

Array.prototype.getDuplicates = function () {
  var duplicates = {};
  for (var i = 0; i < this.length; i++) {
    if (duplicates.hasOwnProperty(this[i])) {
      duplicates[this[i]].push(i);
    } else if (this.lastIndexOf(this[i]) !== i) {
      duplicates[this[i]] = [i];
    }
  }

  return duplicates;
};

const toFindDuplicates = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) !== index);

function removeSpecialChars(duplicateQuotes) {
  return duplicateQuotes.map(({ quote }) => {
    let newQuote = quote.replace(/ /g, "");
    newQuote = newQuote.replace(/[^a-zA-Z0-9 ]/g, "");
    newQuote = newQuote.toLowerCase();
    return newQuote;
  });
}

module.exports.removeSimilarQuotes = function (duplicateQuotes, fileName) {
  let cleanArray = removeSpecialChars(duplicateQuotes);
  const duplicateIndices = Object.values(cleanArray.getDuplicates()).flat(
    Infinity
  );

  const filteredArray = duplicateQuotes.filter(function (_, index) {
    return duplicateIndices.indexOf(index) <= -1;
  });

  console.log(
    duplicateIndices.length,
    "duplicates removed,",
    "Remaining:",
    filteredArray.length
  );

  let reportLog = [];
  Object.values(cleanArray.getDuplicates()).map((duplicates) => {
    let obj = {};
    duplicates.map((dupliQuoteIndex, index) => {
      const property = `dup${index}`;

      obj[property] = duplicateQuotes[dupliQuoteIndex];
    });
    reportLog.push(obj);
    obj = {};
  });

  var xls = json2xls(reportLog);
  fse.outputFileSync(
    path.resolve(
      `filter-quotes/output/reports/dupli-${path.parse(fileName).name}.xlsx`
    ),
    xls,
    "binary"
  );
  return filteredArray;
};
