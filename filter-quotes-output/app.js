// remove puncuation from constant filters
// Remove all urdu quotes
// Remove all single words
// Remove spanish quotes
// Remove Russian quotes
// remove empty quotes
// remove one word quotes
// remove punctuation, toLowercase, trim() then compare and remove duplicates
// remove undefined quotes

var path = require("path");
var Walk = require("@root/walk");
const { walkFunc } = require("./utils/utils");
const inputDirPath = path.resolve("add-ids-to-outputs/output/");

module.exports.start = async function () {
  await Walk.walk(inputDirPath, walkFunc);
};
