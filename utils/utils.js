var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');



module.exports.requestURL = (url) => {
    return new Promise((resolve, reject) => {

        request(url, function (error, response, html) {
            console.log(url);
            if (!error) {
                var $ = cheerio.load(html);

                var json = [];

                $('[data-author=\"Friedrich Nietzsche\"]').each(function (i, elem) {
                    json[i] = $(this).text();
                });
                resolve(json);
            }

        })
    });

}

module.exports.writeToFile = (json, suffix) => {
    return fs.writeFile(`output_${suffix}.json`, JSON.stringify(json, null, 4), function (err) {
        console.log('File successfully written! - Check your project directory for the output.json file');
    })
}