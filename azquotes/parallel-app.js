const { PHILOSOPHERS_DATA } = require('../common/constants/constants');
const { retry } = require('../parallel-calls/utils/utils');
const { checkAZquotesURLExists } = require('./utils/comparisonUtils');
const { requestURL } = require('./utils/utils');

// make work

// return array of work

// write the response to the file
(async function () {
    debugger;

    for (j = 0; j < PHILOSOPHERS_DATA.length; j++) {
        if (checkAZquotesURLExists()) {

            let funcs = [];
            let { lastPage, philosopherNameInSelector } = await findOutLastPage(PHILOSOPHERS_DATA[j].azQuotesURL);

            for (i = 1; i <= lastPage; i++) {
                const urlWithPageNumber = PHILOSOPHERS_DATA[j].azQuotesURL + "?p=" + i
                const retryBinded = retry.bind(this, () => requestURL(urlWithPageNumber, philosopherNameInSelector))
                funcs.push(retryBinded);
            }

            while (funcs.length) {
                await Promise.all(funcs.splice(0, 5).map(f => f()))
            }

        }

    }


})();