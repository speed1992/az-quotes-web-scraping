const json2xls = require('json2xls');
var path = require('path');
const fse = require('fs-extra');

var reportLog = [];

var splitFilterArrayFurther = (arr) => {
    var result = [];
    arr.forEach(value => {
        var splittedChars = value.toLowerCase().split("");
        result = [...result, ...splittedChars];
    });
    return result;
}

var filteringLogic = (quote, filterString) => {
    var quote = quote.toLowerCase();

    if (!quote.includes(filterString)) {
        return true;
    }
    else {
        reportLog.push({ quote, filterString })
        return false;
    }
}


module.exports.filterQuotes = (myQuotes, filterArray,fileName) => {
    filterArray = splitFilterArrayFurther(filterArray);
    var filteredQuotes = [];

    filterArray.forEach((filterStr) => {
        filteredQuotes = myQuotes.filter((quote) => filteringLogic(quote, filterStr));
    });

    var xls = json2xls(reportLog);
    fse.writeFileSync(path.resolve(`output/reports/${fileName}.xlsx`), xls, 'binary');
    reportLog = [];
    return filteredQuotes;
}


