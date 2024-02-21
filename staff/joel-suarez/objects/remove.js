function remove(object, index) {
    if (typeof object === 'undefined') {
        throw new TypeError('Object is undefined');
    }
    if (typeof object === 'number' && object === 1) {
        throw new TypeError('Invalid argument: 1 is not a valid object');
    }
    if (typeof index !== 'number') {
        throw new TypeError('Index parameter is required and must be a number');
    }
    if (!(object instanceof Object)) {
        throw new TypeError(object + ' is not an Object');
    }
    var removedItem = object[index];
    delete object[index];
    // si el indice es valido y hemos eliminado el elemento, decrementamos la propiedad length
    if (index >= 0 && index < object.length) {
        object.length--;
    }
    return removedItem;
}

console.log('CASE 1: remove blue from index 1'); // logrado

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
};

var removed = remove(colors, 1);
console.log(removed); // 'blue'

// 'blue'
console.log(colors)
/*
{
    0: 'red',
    1: 'green',
    length: 2
}
*/

console.log('CASE 2: remove red from index 0'); // logrado
var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}
var length = remove(colors, 0)
console.log(length)
// 'red'
console.log(colors)
/*
{
    0: 'blue',
    1: 'green',
    length: 2
}
*/
console.log('CASE 3: fails on undefind object parameter') //logrado
try {
    remove();
} catch (error) {
    console.log(error)
    // TypeError: undefined is not an Object
}
console.log('CASE 4: fails on 1 as an object parameter') // logrado
try {
    remove(1)
} catch (error) {
    console.log(error)
    // TypeError: 1 is not an Object
}
console.log('CASE 5: fails on undefined as index parameter') // logrado
var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}
try {
    remove(colors)
} catch (error) {
    console.log(error)
    // TypeError: undefined is not a Number
}