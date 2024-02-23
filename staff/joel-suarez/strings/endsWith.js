function endsWith(string, searchString) {
    // posicion inicial
    position = string.length;
    var final = position - searchString.length;

    // iterar las comparaciones q son iguales compara las caracteres uno por uno
    for (let i = final; i < position; i++) {
        if (string[i] !== searchString[i - final]) {
            return false;
        }
    }
    return true;
}
// CASE 1

var s = 'hola mundo'
var result = endsWith(s, 'ndo')
console.assert(result === true, 'function would be return "ndo"');
// true

// CASE 2
var s = 'hola mundo'
var result = endsWith(s, 'dos')
console.assert(result === false, 'function would be return "dos"');
// false