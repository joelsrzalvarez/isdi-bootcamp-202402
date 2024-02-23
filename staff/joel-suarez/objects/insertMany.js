/**
 * Inserts an element in iterable object at specfified index.
 *
 * @param object - The iterable object to mutate. 
 * @param index - The index from which to insert the given values.
 * @param value - The value to insert.
 * 
 * @throws {TypeError} When object is not an object, or when index is not a number.
 */
function insert(object, index, value) {
    if (!object || !(object instanceof Object)) {
        throw new TypeError('Object parameter is required and must be an Object');
    }

}
console.log('CASE 1: insert skyblue in index 1'); // LOGRADO

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = insert(colors, 1, 'skyblue');

console.log(length)
// 4

console.log(colors)

console.log('CASE 2: insert skyblue, gold and plum in index 2') // LOGRADO

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = insert(colors, 2, 'skyblue', 'gold', 'plum')

console.log(length)
// 6

console.log(colors)

console.log('CASE 3: fails on undefind object parameter')  // LOGRADO

try {
    insert(undefined, 2, 'skyblue', 'gold', 'plum');
} catch (error) {
    console.log(error)
    // TypeError: undefined is not an Object
}

console.log('CASE 4: fails on 1 as a object parameter') //logrado

try {
    insert(null, 2, 'skyblue', 'gold', 'plum');
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
    insert(colors)
} catch (error) {
    console.log(error)
    // TypeError: undefined is not a Number
}