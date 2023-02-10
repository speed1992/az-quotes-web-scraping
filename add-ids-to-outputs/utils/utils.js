
var path = require("path");
var fse = require("fs-extra");
const { writeToFile } = require("../../common/utils/utils");

function addIds (filename, inputDirPath)  {

    fse.readFile(inputDirPath + "/" + filename, "utf8",
    function (err, data) {
        if (err) throw err;
        quotes = JSON.parse(data);
        if (quotes !== undefined) {
        var newJSON = [];
        quotes.forEach((element, index) => {
            var obj = { id: index + 1, quote: element };
            newJSON.push(obj);
        });
        }
        writeToFile(newJSON, { varName: path.parse(filename).name }, "add-ids-to-outputs");
    });

}


module.exports.walkFunc = function(err, pathname, dirent) {
    if (err) {
      console.warn("fs stat error for %s: %s", pathname, err.message);
      return Promise.resolve();
    }

    if(dirent.isFile()){
        addIds(dirent.name, path.dirname(pathname))
    }

    return Promise.resolve();
  }

