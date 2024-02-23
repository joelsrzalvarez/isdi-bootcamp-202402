function split(str, limit) {
    var length = str.length;
    var result = [];
    var startIndex = 0;

    for (var i = 0; i < length; i++) {
        if (str[i] === limit) {
            var subStr = '';
            for (var j = startIndex; j < i; j++) {
                subStr += str[j];
            }
            result[result.length] = subStr;
            startIndex = i + 1;
        }
    }

    var subStr = '';
    for (var j = startIndex; j < length; j++) {
        subStr += str[j];
    }
    result[result.length] = subStr;
    return result;
}

// CASE 1

var s = 'hola mundo';
var words = split(s, ' ');
console.log(words);
console.assert(words === "['hola', 'mundo']", "split should return ['hola', 'mundo']");
// ['hola', 'mundo']