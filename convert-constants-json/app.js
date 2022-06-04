const { PHILOSOPHERS_DATA } = require('../common/constants/constants');
const { writeToFile } = require('../common/utils/utils');
const { capitalize } = require('./utils/utils');

module.exports.start = function () {
        let obj = {
                value: "",
                fullName: "",
                fullNameInOtherLanguages: {
                        hi: ""
                }
        };

        var result = [];

        PHILOSOPHERS_DATA.forEach((philosopherInfo, index) => {

                var newObj = { ...obj };
                newObj.value = philosopherInfo.varName;
                newObj.fullName = capitalize(philosopherInfo.varName);

                // make a call to translate api
                
                result.push(newObj);

        });


        console.log(result);

        writeToFile(result, { varName: "CONVERTED_CONSTANTS" }, "./");

        //(json, { philosopherNameInSelector = null, varName }, MODULE_NAME, customContentToggle = false)
};

this.start();