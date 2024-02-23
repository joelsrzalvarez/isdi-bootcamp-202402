delete String.prototype.concat;

function concat() {
    var concatenatedString = '';
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (typeof arg !== 'string') {
            throw new TypeError('arguments must be strings');
        }
        concatenatedString += arg;
    }
    return concatenatedString;
}

// Test
console.assert(concat('hola', ' ', 'mundo') === 'hola mundo', 'result is not as expected'); // test
