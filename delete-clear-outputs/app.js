const fse = require('fs-extra');
const path = require('path')

module.exports.deleteOutputDirectories = function (moduleNames) {
    return new Promise((resolve, reject) => {
        const promiseArray = []

        moduleNames.forEach((module) => {
            const dir = path.resolve(`${module}/output`)
            const promise = fse.rm(dir, { recursive: true })
                .then(() => console.log("Deleted ", dir))
                .catch(e => console.log("Caught", e));
            promiseArray.push(promise);
        });

        Promise.allSettled(promiseArray).then(resolve).catch((e) => console.log(e));

    })


}


