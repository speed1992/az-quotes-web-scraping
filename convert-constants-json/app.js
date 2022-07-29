const { PHILOSOPHERS_DATA } = require('../common/constants/constants');
const { writeToFile } = require('../common/utils/utils');
const { capitalize } = require('./utils/utils');

let obj = {
        value: "",
        fullName: "",
        fullNameInOtherLanguages: {
                hi: ""
        }
};

module.exports.getConvertedObject = function (philosopherInfo) {
        var newObj = { ...obj };
        newObj.value = philosopherInfo.varName;
        newObj.fullName = capitalize(philosopherInfo.varName);

        console.log(newObj)

        return newObj;

};

module.exports.convert = function () {

        var result = [];

        for (var i = 0; i < PHILOSOPHERS_DATA.length; i++) {
                let newObj = this.getConvertedObject(PHILOSOPHERS_DATA[i]);

                result.push(newObj);

        }
        return result;
}

module.exports.start = async function () {

        let result = this.convert();

        console.log(result);

        writeToFile(result, { varName: "CONVERTED_CONSTANTS" }, "./");

};