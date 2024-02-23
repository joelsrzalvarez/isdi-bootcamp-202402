function add(obj, value) {
    var lastIndex = 0;
    for (var key in obj) {
        var numericKey = parseInt(key);
        if (!isNaN(numericKey) && numericKey >= lastIndex) {
            lastIndex = numericKey + 1;
        }
    }
    obj[lastIndex] = value;
    obj.length = lastIndex + 1;
}

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
};

add(colors, 'yellow');

for (var cont = 0; cont < colors.length; cont++) {
    console.assert(colors[cont] === colors[cont], 'Color incorrecto al añadirlo al objeto');
}

console.assert(colors.length === 4, 'Propiedad length actualizada incorrectamente');
