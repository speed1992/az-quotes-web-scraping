const { requestURL, writeToFile } = require('./utils/utils');

(async function () {

  url = 'https://www.azquotes.com/author/10823-Friedrich_Nietzsche?p=';

  console.log('App started');
  for (i = 1; i <= 100; i++) {
    console.log(i);
    const json = await requestURL(url + i);
    await writeToFile(json, i);
  }


})();

// console.log('Magic happens on port 8081');
