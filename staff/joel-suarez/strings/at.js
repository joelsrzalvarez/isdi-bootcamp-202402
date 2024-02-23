function at(searchString, index) {
    console.assert(typeof searchString === 'string', 'searchString needs to be a string');
    console.assert(typeof index === 'number', 'index needs to be a number');

    var character;
    if (index >= 0) {
        character = searchString[index];
    } else {
        var newIndex = searchString.length + index;
        character = searchString[newIndex];
    }
    return character;
}

// CASE 1
var s = 'hola mundo';
var char = at(s, 6);
console.assert(char === 'u', 'character at index 6 should be "u"');

// CASE 2
var s = 'hola mundo';
var char = at(s, 20);
console.assert(char === undefined, 'character at index 20 should be undefined');

// CASE 3
var s = 'hola mundo';
var char = at(s, -4);
console.assert(char === 'n', 'character at index -4 should be "n"');
