const levenshtein = require("js-levenshtein");

console.log('App start')

const printDistance = (str1, str2, distance) => {
    console.log(`Distance of 
    
    ${str1} 
    
    \&
    
    ${str2}
    
    is
    
    ${distance}`)
}


function compare(arr, disimilarityCoffecient = 5) {
    var removalCounter = 0;

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (i !== j) {
                const distance = levenshtein(arr[i], arr[j])
                if (distance <= disimilarityCoffecient) {
                    arr.splice(j, 1)
                    removalCounter++
                    printDistance(arr[i], arr[j], distance)
                }
            }
        }
    }
    console.log('removalCounter: ', removalCounter)

}

module.exports.compare = compare;