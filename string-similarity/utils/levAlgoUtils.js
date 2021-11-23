const levenshtein = require("js-levenshtein");
const { writeToExcel } = require("./diceAlgo");

console.log('App start')

const printDistance = (str1, str2, distance) => {
    console.log(`Distance of 
    
    ${str1} 
    
    \&
    
    ${str2}
    
    is
    
    ${distance}`)
}


function compare(arr, disimilarityCoffecient) {
    console.log("reaching")
    var removalCounter = 0;
    const result = [];

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (i !== j) {
                let distance;
                try {
                    distance = levenshtein(arr[i], arr[j])
                }
                catch (e) { }
                if (distance <= disimilarityCoffecient) {
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

module.exports.compare = compare;