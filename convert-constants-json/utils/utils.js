const fetch = require("node-fetch");
const request = require("request");
var cheerio = require("cheerio");

module.exports.capitalize = function (input) {
  input = input.toLowerCase();
  var words = input.split("_");
  var CapitalizedWords = [];
  words.forEach((element) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return CapitalizedWords.join(" ");
};

module.exports.hitTranslationAPI = async function ({
  from = "en",
  to = "hi",
  inputText,
}) {
  const response = await fetch(
    "https://translate.argosopentech.com/translate",
    {
      method: "POST",
      body: JSON.stringify({
        q: inputText,
        source: from,
        target: to,
        format: "text",
        api_key: "",
      }),
      headers: { "Content-Type": "application/json" },
    }
  ).catch((e) => {
    console.log(e);
  });

  const { translatedText } = await response.json();
  console.log(translatedText);

  return translatedText;
};

module.exports.findOutPhilosopherName = (url) => {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);

        const philosopherNameInSelector = $(
          ".leftContainer h1 > a:nth-child(2)"
        )
          .text()
          .trim();
        console.log(philosopherNameInSelector);

        resolve(philosopherNameInSelector);
      }
    });
  });
};
