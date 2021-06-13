var request = require('request');
var fse = require('fs-extra');
var cheerio = require('cheerio');
const { STATIC_SUBSTRING1, STATIC_SUBSTRING2 } = require('../constants/constants');

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

                console.log("Response length", json.length)

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

module.exports.writeToFile = (json, { philosopherNameInSelector, varName }) => {
    const philosopher = `${philosopherNameInSelector}/${philosopherNameInSelector.toLowerCase()}.js`
    const outputPath = `output/${philosopher}`
    const content = `${STATIC_SUBSTRING1}${varName}${STATIC_SUBSTRING2}${JSON.stringify(json, null, 4)}`

    return fse.outputFile(outputPath, content, err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`The file ${philosopher} was saved!`);
        }
    })
}

