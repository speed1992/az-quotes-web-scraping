const { PHILOSOPHERS_DATA } = require('../common/constants/constants');

// make work

// return array of work

// write the response to the file


for (j = 0; j < PHILOSOPHERS_DATA.length; j++) {
    if (PHILOSOPHERS_DATA[j].azQuotesURL && PHILOSOPHERS_DATA[j].azQuotesURL != "" && typeof PHILOSOPHERS_DATA[j].azQuotesURL !== undefined) {

        let { lastPage, philosopherNameInSelector } = await findOutLastPage(PHILOSOPHERS_DATA[j].azQuotesURL);

        for (i = 1; i <= lastPage; i++) {
            const urlWithPageNumber = PHILOSOPHERS_DATA[j].azQuotesURL + "?p=" + i
            const json = await requestURL(urlWithPageNumber, philosopherNameInSelector);
        }

    }

}
