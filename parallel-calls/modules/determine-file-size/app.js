const request = require("request");

function determineFileSize() {
    return new Promise((resolve, _) => {
        request(
            {
                method: 'GET'
                , uri: 'https://www.azquotes.com/author/2398-Albert_Camus'
            }
            , function (error, response, html) {
                console.log(html.length)
                resolve(html.length);
            })
    });

}


module.exports.determineFileSize = determineFileSize