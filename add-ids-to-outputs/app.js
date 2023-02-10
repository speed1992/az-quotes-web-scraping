
var Walk = require("@root/walk");
var path = require("path");
const inputDirPath = path.resolve("combine-output/output");
const { walkFunc } = require("./utils/utils");

module.exports.start = async function () {
  await Walk.walk(inputDirPath, walkFunc);
};
