const fetch = require('node-fetch')

module.exports.capitalize = function (input) {
    input = input.toLowerCase();
    var words = input.split('_');
    var CapitalizedWords = [];
    words.forEach(element => {
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(' ');
}

module.exports.hitTranslationAPI = async function ({ from, to, inputText }) {

    const response = await fetch("https://translate.argosopentech.com/translate", {
        method: "POST",
        body: JSON.stringify({ q: inputText, source: from, target: to, format: "text", api_key: "" }),
        headers: { "Content-Type": "application/json" }
    }).catch((e) => { })

    const { translatedText } = await response.json();

    return translatedText;
}