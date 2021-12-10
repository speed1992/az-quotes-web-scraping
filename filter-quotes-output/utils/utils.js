
const { FILTERS } = require("../constants/constants");

function performCleanUp() {
    let newFilters = [];

    console.log("FILTERS before split", FILTERS)

    FILTERS.languageFilters.forEach((filterSentence, index) => {
        const filtersAfterSplit = filterSentence.replaceAll(/\s/g, '').split('')
        newFilters = [...newFilters, ...filtersAfterSplit]
    });

    console.log("FILTERS after split", newFilters)
}

performCleanUp();