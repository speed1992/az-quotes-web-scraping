// const ufs = require("url-file-size");

// ufs("https://dimden.dev/logo.png")
//     .then(console.log) // 1416
//     .catch(console.error);

const request = require("request");


function determineFileSize() {
    return new Promise((resolve, _) => {
        request(
            {
                method: 'GET'
                , uri: 'https://www.azquotes.com/author/2398-Albert_Camus'
            }
            , function (error, response, body) {
                console.log(body.length)
                resolve(body.length);
            })
    });

}


module.exports.determineFileSize = determineFileSize