delete Array.prototype.push;

function push(array, element) {
    var length = array.length;
    array[length] = element;
    array.length = length + 1;
    return array;
}

// test
var arr = [1, 2, 3];
push(arr, 4); // devuelve 4
console.log(arr); // salida: [1, 2, 3, 4]

var sports = ['soccer', 'baseball']
var length = push(sports)
console.log(length)

var x = [1, 2, [3, 4]]
for (let i = 0; i, x.length; i++) {
    if (x[i] == 3) {
        console.log('entras');
    }
}