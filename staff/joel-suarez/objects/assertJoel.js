function assertEqual(obj, test) {
    test.forEach(test => {
        console.assert(test.condition, test.message);
    });
}

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
};

add(colors, 'yellow');

var tests = [
    { obj: colors[3] === 'yellow', message: 'Color incorrecto al añadirlo al objeto' },
    { obj: colors.length === 4, message: 'Propiedad length actualizada incorrectamente' }
];

assertEqual(colors, tests);
