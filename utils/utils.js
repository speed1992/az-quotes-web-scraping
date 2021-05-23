var request = require('request');
var fse = require('fs-extra');
var cheerio = require('cheerio');
const { PHILOSOPHERS_DATA } = require('../constants/constants');

module.exports.requestURL = (url, philosopherIndex) => {
    return new Promise((resolve, reject) => {

        request(url, function (error, response, html) {
            console.log(url);
            if (!error) {
                var $ = cheerio.load(html);

                var json = [];
                // $('[data-author=\"Friedrich Nietzsche\"]').each(function (i, elem) {
                // $('[data-author=\"Arthur Schopenhauer\"]').each(function (i, elem) {
                $('[data-author=\"' + PHILOSOPHERS_DATA[philosopherIndex].philosopherNameInSelector + '\"]').each(function (i, elem) {
                    json[i] = $(this).text();
                });
                resolve(json);
            }

        })
    });

}

module.exports.writeToFile = (json, suffix, philosopherNameInSelector) => {
    return fse.outputFile(`output/${philosopherNameInSelector}/output_${suffix}.json`, JSON.stringify(json, null, 4), err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`The file output_${suffix}.json was saved!`);
        }
    })
}