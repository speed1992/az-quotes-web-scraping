const { PHILOSOPHERS_DATA } = require('../constants/constants');
const { requestURL, writeToFile, findOutLastPage } = require('./utils/utils');

module.exports.start = async function () {

  return new Promise(function (resolve, _) {

    console.log('AZ-Quotes App started');

    for (j = 0; j < PHILOSOPHERS_DATA.length; j++) {

      let quotesCollection = []

      let { lastPage, philosopherNameInSelector } = await findOutLastPage(PHILOSOPHERS_DATA[j].azQuotesUrl);

      for (i = 1; i <= lastPage; i++) {
        console.log("Page No.", i);
        const urlWithPageNumber = PHILOSOPHERS_DATA[j].azQuotesUrl + "?p=" + i
        const json = await requestURL(urlWithPageNumber, philosopherNameInSelector);
        quotesCollection = [...quotesCollection, ...json]
      }

      writeToFile(quotesCollection, { philosopherNameInSelector, varName: PHILOSOPHERS_DATA[j].varName });

      resolve();
    }

  });

};