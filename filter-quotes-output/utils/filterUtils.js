var filterArray = ["व"];
var myQuotes = ["Nietzsche", "स्लैवज", "SSchopenhauer"]

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


const filterQuotes = (myQuotes, filterArray) => {
    filterArray = splitFilterArrayFurther(filterArray);
    var filteredQuotes = [];

    filterArray.forEach((filterStr) => {
        filteredQuotes = myQuotes.filter((quote) => filteringLogic(quote, filterStr));
    });
    return refinedQuotes;
}



console.log(filterQuotes(myQuotes, filterArray))

// XlsX(reportLog)