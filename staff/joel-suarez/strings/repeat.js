function repeat(str, count) {
    var repeatedString = '';
    for (var i = 0; i < count; i++) {
        repeatedString += str;
    }
    return repeatedString;
}

// CASE 1
var s = 'happy! ';
var result = repeat(s, 3);
console.assert(result === 'happy! happy! happy! ', 'should return happy! happy! happy! ');
// 'happy! happy! happy!'