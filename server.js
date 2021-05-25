const { PHILOSOPHERS_DATA } = require('./constants/constants');
const { requestURL, writeToFile, findOutLastPage } = require('./utils/utils');

(async function () {

  console.log('App started');
  let quotesCollection = []

  for (j = 0; j < PHILOSOPHERS_DATA.length; j++) {

    let { lastPage, philosopherNameInSelector } = await findOutLastPage(PHILOSOPHERS_DATA[j]);

    for (i = 1; i <= lastPage; i++) {

      console.log(i);

      const urlWithPageNumber = PHILOSOPHERS_DATA[j] + "?p=" + i

      const json = await requestURL(urlWithPageNumber, philosopherNameInSelector);

      quotesCollection = [...quotesCollection, ...json]

    }

    writeToFile(quotesCollection, i, philosopherNameInSelector);

  }

})();