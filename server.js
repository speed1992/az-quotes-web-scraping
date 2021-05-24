const { PHILOSOPHERS_DATA } = require('./constants/constants');
const { requestURL, writeToFile } = require('./utils/utils');

(async function () {

  console.log('App started');
  let quotesCollection = []

  for (j = 0; j < PHILOSOPHERS_DATA.length; j++) {

    for (i = 1; i <= PHILOSOPHERS_DATA[j].lastPage; i++) {

      console.log(i);

      const json = await requestURL(PHILOSOPHERS_DATA[j].URL + "?p=" + i, j);

      quotesCollection = [...quotesCollection, ...json]

    }

    writeToFile(quotesCollection, i, PHILOSOPHERS_DATA[j].philosopherNameInSelector);

  }

})();