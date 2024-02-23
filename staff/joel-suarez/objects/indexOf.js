function indexOf(obj, value) {
    for (var cont in obj) {
        if (obj[cont] === value) {
            return cont;
        }
    }
    return -1;
}

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
};

var index = indexOf(colors, 'blue');
console.assert(colors[1] === 'blue', 'primera posicion deberia ser blue');