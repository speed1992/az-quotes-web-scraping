const stringSimilarity = require("string-similarity");
const fse = require('fs-extra');
const json2xls = require('json2xls')

// const printDistance = (str1, str2, distance) => {
//     console.log(`Distance of 

//     ${str1} 

//     \&

//     ${str2}

//     is

//     ${distance}`)
// }

function writeToExcel(json) {
    var xls = json2xls(json);

    fse.writeFileSync(`data.xlsx`, xls, 'binary');
}

function compare(arr, disimilarityCoffecient = 0.95) {

    console.log("disimilarityCoffecient:", disimilarityCoffecient)
    var removalCounter = 0;
    const result = [];

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (i !== j) {
                let distance;
                try {
                    distance = stringSimilarity.compareTwoStrings(arr[i], arr[j])
                }
                catch (e) { }

                if (disimilarityCoffecient === distance) {
                    arr.splice(j, 1)
                    removalCounter++
                    result.push({ str1: arr[i], str2: arr[j], distance })
                    // printDistance(arr[i], arr[j], distance)
                }
            }
        }
    }
    writeToExcel(result);
    console.log('removalCounter: ', removalCounter)

}

module.exports.writeToExcel = writeToExcel;
module.exports.compare = compare;