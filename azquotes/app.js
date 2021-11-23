const { PHILOSOPHERS_DATA } = require('../common/constants/constants');
const { writeToFile } = require('../common/utils/utils');
const { MODULE_NAME } = require('./constants/constants');
const { requestURL, findOutLastPage } = require('./utils/utils');

module.exports.start = function () {

  return new Promise(async function (resolve, _) {

    console.log('AZ-Quotes App started');

    for (j = 0; j < PHILOSOPHERS_DATA.length; j++) {
      if (PHILOSOPHERS_DATA[j].azQuotesUrl && PHILOSOPHERS_DATA[j].azQuotesUrl != "" && typeof PHILOSOPHERS_DATA[j].azQuotesUrl !== undefined) {

        let quotesCollection = []

        let { lastPage, philosopherNameInSelector } = await findOutLastPage(PHILOSOPHERS_DATA[j].azQuotesUrl);

        for (i = 1; i <= lastPage; i++) {
          console.log("Page No.", i);
          const urlWithPageNumber = PHILOSOPHERS_DATA[j].azQuotesUrl + "?p=" + i
          const json = await requestURL(urlWithPageNumber, philosopherNameInSelector);
          quotesCollection = [...quotesCollection, ...json]
        }

        writeToFile(quotesCollection, { philosopherNameInSelector, varName: PHILOSOPHERS_DATA[j].varName }, MODULE_NAME);
      }

      resolve();
    }

  });

};