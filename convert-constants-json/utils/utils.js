module.exports.capitalize = function (input) {
    input = input.toLowerCase();
    var words = input.split('_');
    var CapitalizedWords = [];
    words.forEach(element => {
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(' ');
}  