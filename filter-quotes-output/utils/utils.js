
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

performCleanUp()

/*

function callback(err, data) {
    if (err) console.log(err);
    return data;
}

const parseOutput = (data) => JSON.parse(data);

function readFileFromAllModules() {
    return new Promise(function (resolve, _) {

        for (let i = 0; i < PHILOSOPHERS_DATA.length; i++) {
            const varName = PHILOSOPHERS_DATA[i].varName.toLowerCase();
            let combinedOutput = [];

            for (let j = 0; j < modules.length; j++) {
                let output;
                const inputPath = `../../${modules[j]}/output/${varName}.json`
                try {
                    output = fse.readFileSync(path.resolve(__dirname, inputPath), "utf8", callback)
                    if (typeof output != undefined && output)
                        combinedOutput = [...combinedOutput, ...(parseOutput(output))];
                } catch (e) {
                    console.log(e)
                }

            }
            combinedOutput = [...new Set(combinedOutput)]
            writeToFile(combinedOutput, { varName }, "combine-output")
kk
        }
        resolve()
    });

}

*/