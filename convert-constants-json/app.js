// const { PHILOSOPHERS_DATA } = require('../common/constants/constants');
const { writeToFile } = require('../common/utils/utils');
const { capitalize, hitTranslationAPI } = require('./utils/utils');

const PHILOSOPHERS_DATA = [
        {
                azQuotesURL: "https://www.azquotes.com/author/13993-Joseph_Stalin",
                goodreadsURL: "https://www.goodreads.com/author/quotes/138332.Joseph_Stalin",
                varName: "STALIN"
        },
        {
                azQuotesURL: "https://www.azquotes.com/author/11735-Plutarch",
                goodreadsURL: "https://www.goodreads.com/author/quotes/31015.Plutarch",
                varName: "PLUTARCH"
        },
        {
                azQuotesURL: "https://www.azquotes.com/author/14903-Mike_Tyson",
                goodreadsURL: "https://www.goodreads.com/author/quotes/6583167.Mike_Tyson",
                varName: "TYSON"
        }
];

let obj = {
        value: "",
        fullName: "",
        fullNameInOtherLanguages: {
                hi: ""
        }
};

module.exports.getConvertedObject = async function (philosopherInfo) {
        var newObj = { ...obj };
        newObj.value = philosopherInfo.varName;
        newObj.fullName = capitalize(philosopherInfo.varName);

        // make a call to translate api
        let translatedText = await hitTranslationAPI({ from: "en", to: "hi", inputText: newObj.fullName })
        newObj.fullNameInOtherLanguages.hi = translatedText;

        console.log(newObj)

};

module.exports.convert = function () {

        return new Promise(async (resolve, _) => {

                var result = [];

                for (var i = 0; i < PHILOSOPHERS_DATA.length; i++) {
                        // console.log(philosopherInfo);
                        let newObj = await this.getConvertedObject(PHILOSOPHERS_DATA[i]);

                        result.push(newObj);

                        if (i === PHILOSOPHERS_DATA.length - 1) resolve(result);
                }
        });

}

module.exports.start = async function () {


        let result = await this.convert();

        console.log(result);

        writeToFile(result, { varName: "CONVERTED_CONSTANTS" }, "./");

};

this.start();