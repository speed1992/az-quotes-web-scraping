
const { FILTERS } = require("../constants/constants");

module.exports.splitFilters = function () {
    let newFilters = [];

    console.log("FILTERS before split", FILTERS)

    FILTERS.languageFilters.forEach((filterSentence, index) => {
        const filtersAfterSplit = filterSentence.replace(/\s/g, '').split('')
        newFilters = [...newFilters, ...filtersAfterSplit]
    });

    return newFilters;
}


