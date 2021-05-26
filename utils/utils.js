var request = require('request');
var fse = require('fs-extra');
var cheerio = require('cheerio');

module.exports.requestURL = (url, philosopherNameInSelector) => {
    return new Promise((resolve, reject) => {

        request(url, function (error, response, html) {
            if (error) {
                console.log(error);
                reject(error)
            }

            let json = [];

            console.log(url);

            if (!error) {
                var $ = cheerio.load(html);


                $('[data-author=\"' + philosopherNameInSelector + '\"]').each(function (i, elem) {
                    json[i] = $(this).text();
                });

                console.log("json.length", json.length)

                resolve(json);

            }

        })
    });

}

module.exports.findOutLastPage = (url) => {
    url = url + "?p=10000000";
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {

            console.log(url);

            if (!error) {
                var $ = cheerio.load(html);

                let lastPage = $('#fly-scroll-container > div.leftcol.quotations > div > h1').text().trim().split(" ");
                const philosopherNameInSelector = $('.author').first().text().trim()

                console.log(lastPage);

                lastPage = lastPage[lastPage.length - 1];

                resolve({ lastPage, philosopherNameInSelector });

            }

        })
    });
}

module.exports.writeToFile = (json, philosopherNameInSelector) => {
    return fse.outputFile(`output/${philosopherNameInSelector}/output.js`, JSON.stringify(json, null, 4), err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`The file output.js was saved!`);
        }
    })
}

