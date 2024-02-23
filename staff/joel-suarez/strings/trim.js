function trim(str) {
    var start = 0;
    var end = str.length - 1;

    while (str[start] === ' ' || str[start] === '\n' || str[start] === '\t' || str[start] === '\r') {
        start++;
    }

    while (str[end] === ' ' || str[end] === '\n' || str[end] === '\t' || str[end] === '\r') {
        end--;
    }

    // Construir cadena
    var trimStr = '';
    for (var i = start; i <= end; i++) {
        trimStr += str[i];
    }
    return trimStr;
}

//CASE 1
var greeting = '   Hello, World!   ';
var trimmed = trim(greeting);
console.assert(trimmed === 'Hello, World!', 'trim should return Hello, World!'); // '>Hello, World!<'

// CASE 2
var greeting = ' \n\t\r hola mundo \n\t\r ';
var trimmed = trim(greeting);
console.assert(trimmed === 'hola mundo', 'trim should return hola mundo'); // '>hola mundo<'
