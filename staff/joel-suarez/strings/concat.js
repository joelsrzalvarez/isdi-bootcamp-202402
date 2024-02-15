delete String.prototype.concat;

function concat() {
    var concatenatedString = '';
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        for (var j = 0; j < arg.length; j++) {
            concatenatedString += arg[j];
        }
    }
    return concatenatedString;
}

// Test
console.log(concat('hola', ' ', 'mundo')); // Devuelve 'hello world'