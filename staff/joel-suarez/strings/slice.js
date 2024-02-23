function slice(string, indexStart, indexEnd) {
    var piece = '';
    if (indexStart > 0) {
        for (var i = indexStart; i < indexEnd; i++)
            piece = piece + string[i];
    }
    else {
        for (var i = string.length + indexStart; i < string.length; i++) {
            piece = piece + string[i];
        }
    }
    return piece;
}

// CASE 1

var s = 'hola mundo'
var piece = slice(s, 5, 8);
console.assert(piece === 'mun', 'slice should return mun instead');
// 'mun'

// CASE 2
var s = 'hola mundo'
var piece = slice(s, -3);
console.assert(piece === 'ndo', 'slice should return ndo instead');
// 'ndo'