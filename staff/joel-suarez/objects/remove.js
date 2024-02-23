/**
 * Removes an element from an iterable object at the specified index.
 *
 * @param object - The iterable object to mutate.
 * @param index - The index from which to remove the element.
 * @returns - The removed element.
 * 
 * @throws {TypeError} When object is undefined or not an object, or when index is not a number.
 */
function remove(object, index) {
    console.assert(typeof object !== 'undefined', 'Object is undefined');
    console.assert(typeof object === 'object', object + ' is not an Object');
    console.assert(typeof index === 'number', 'Index parameter is required and must be a number');

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
console.assert(removed === 'blue', 'Removed item is incorrect');
console.assert(colors[1] === undefined, 'Item not removed correctly');

//console.log(colors);

console.log('CASE 2: remove red from index 0'); // logrado

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}
var removed = remove(colors, 0);
console.assert(removed === 'red', 'Removed item is incorrect');
console.assert(colors[0] === undefined && colors[1] === 'blue', 'Item not removed correctly');

//console.log(colors);

console.log('CASE 3: fails on undefind object parameter') //logrado
try {
    remove();
} catch (error) {
    console.assert(error instanceof TypeError, 'Error should be a TypeError');
    //console.log(error.message);
}

console.log('CASE 4: fails on 1 as an object parameter') // logrado
try {
    remove(1);
} catch (error) {
    console.assert(error instanceof TypeError, 'Error should be a TypeError');
    //console.log(error.message);
}

console.log('CASE 5: fails on undefined as index parameter') // logrado

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

try {
    remove(colors);
} catch (error) {
    console.assert(error instanceof TypeError, 'Error should be a TypeError');
    //console.log(error.message);
}
