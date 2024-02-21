function add(obj, index, value) {
    var lastIndex = 0;
    for (var key in obj) {
        if (key && key >= lastIndex) {
            lastIndex = key + 1;
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

push(colors, 'yellow');
console.log(colors); // Debería imprimir {0: 'red', 1: 'blue', 2: 'green', 3: 'yellow', length: 4}
