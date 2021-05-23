const { PHILOSOPHERS_DATA } = require('./constants/constants');
const { requestURL, writeToFile } = require('./utils/utils');

(async function () {

  console.log('App started');

  for (j = 0; j < PHILOSOPHERS_DATA.length; j++) {

    for (i = 1; i <= PHILOSOPHERS_DATA[j].lastPage; i++) {

      console.log(i);

      const json = await requestURL(PHILOSOPHERS_DATA[j].URL + "?p=" + i, j);

      writeToFile(json, i, PHILOSOPHERS_DATA[j].philosopherNameInSelector);

    }

  }

})();