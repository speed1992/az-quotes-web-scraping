var Walk = require("@root/walk");
var path = require("path");
const inputDirPath = path.resolve("combine-output/output");
const { walkFunc } = require("./utils/utils");

module.exports.start = function () {
  return new Promise(async (resolve, reject) => {
    Walk.walk(inputDirPath, walkFunc).then(resolve);
  });
};
