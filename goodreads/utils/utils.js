var request = require('request');
var fse = require('fs-extra');
var cheerio = require('cheerio');
const { STATIC_SUBSTRING1, STATIC_SUBSTRING2, PHILOSOPHERS_DATA } = require('../../common/constants/constants');

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


                $('.quoteText').each(function (i, elem) {
                    try {
                        var str = $(this).text().trim().split("\n")[0]
                        str = str.replace("“", "");
                        str = str.replace("”", "");
                        json[i] = str.trim();

                    } catch { }

                });

                console.log("Response length", json.length)

                resolve(json);

            }

        })
    });

}

module.exports.findOutLastPage = (url) => {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {

            console.log(url);

            if (!error) {
                var $ = cheerio.load(html);

                let lastPage = $('body > div.content > div.mainContentContainer > div.mainContent > div.mainContentFloat > div.leftContainer > div > div:nth-child(33) > div :nth-last-child(2)').text().trim();

                const philosopherNameInSelector = $('.leftContainer h1').text().trim().split("\n")[0]

                console.log(philosopherNameInSelector);
                console.log("Last Page", lastPage);

                resolve({ lastPage, philosopherNameInSelector });

            }

        })
    });
}

function goodreads() {
    document.querySelectorAll(".quoteText").forEach((selector, index) => {

        try {

            var str = selector.textContent.trim().split("\n")[0]
            str = str.replace("“", "");
            str = str.replace("”", "");
            console.log(str.trim())

        } catch { }

    })


}

