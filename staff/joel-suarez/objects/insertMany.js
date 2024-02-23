/**
 * insertManys an element in an iterable object at specified index.
 *
 * @param object - The iterable object to mutate. 
 * @param index - The index from which to insertMany the given values.
 * @param value - The value to insertMany.
 * 
 * @throws {TypeError} When object is not an object, or when index is not a number.
 */
function insertMany(object, index, ...values) {
    console.assert(object && typeof object === 'object', 'Object parameter is required and must be an Object');
    console.assert(typeof index === 'number', 'Index parameter is required and must be a number');

    var originalLength = object.length;
    var numValues = values.length;

    // mover los elementos hacia la derecha para hacer espacio para los nuevos valores
    for (var i = originalLength + numValues - 1; i > index + numValues - 1; i--) {
        object[i] = object[i - numValues];
    }

    // insertar los nuevos valores en el objeto en la posición que le decimos
    for (var j = 0; j < numValues; j++) {
        object[index + j] = values[j];
    }

    // aumentar la propiedad length
    object.length += numValues;
}

console.log('CASE 1: insertMany skyblue in index 1'); // LOGRADO

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = insertMany(colors, 1, 'skyblue');

console.assert(length === 4, 'Returned length is incorrect');
console.assert(colors[1] === 'skyblue', 'Color not insertManyed correctly');

//console.log(colors);

console.log('CASE 2: insertMany skyblue, gold and plum in index 2') // LOGRADO

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = insertMany(colors, 2, 'skyblue', 'gold', 'plum');

console.assert(length === 6, 'Returned length is incorrect');
console.assert(colors[2] === 'skyblue' && colors[3] === 'gold' && colors[4] === 'plum', 'Colors not insertManyed correctly');

//console.log(colors);

console.log('CASE 3: fails on undefined object parameter')  // LOGRADO

try {
    insertMany(undefined, 2, 'skyblue', 'gold', 'plum');
} catch (error) {
    console.assert(error instanceof TypeError, 'Error should be a TypeError');
    //console.log(error.message);
}

console.log('CASE 4: fails on null object parameter') //logrado

try {
    insertMany(null, 2, 'skyblue', 'gold', 'plum');
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
    insertMany(colors);
} catch (error) {
    console.assert(error instanceof TypeError, 'Error should be a TypeError');
    // console.log(error.message);
}
