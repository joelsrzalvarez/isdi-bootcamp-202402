/**
 * Inserts an element in an iterable object at the specified index.
 *
 * @param object - The iterable object to mutate.
 * @param index - The index from which to insert the given values.
 * @param value - The value to insert.
 * @returns - The updated length of the object.
 * 
 * @throws {TypeError} When object is not an object, or when index is not a number.
 */
function insert(object, index, value) {
    console.assert(object instanceof Object, object + ' is not an Object');
    console.assert(typeof index === 'number', index + ' is not a Number');

    for (var i = object.length; i > index; i--) {
        object[i] = object[i - 1];
    }

    object[index] = value;

    object.length++;

    return object.length;
}

console.log('CASE 1: insert skyblue in index 1');

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
};

var length = insert(colors, 1, 'skyblue');

console.assert(length === 4, 'Returned length is incorrect');
console.assert(colors[1] === 'skyblue', 'Value not inserted correctly');

//console.log(colors);

console.log('CASE 2: insert 300, at index 2');

var nums = {
    0: 100,
    1: 200,
    2: 400,
    3: 500,
    4: 600,
    5: 700,
    length: 6
};

var length = insert(nums, 2, 300);

console.assert(length === 7, 'Returned length is incorrect');
console.assert(nums[2] === 300, 'Value not inserted correctly');

//console.log(nums);

console.log('CASE 3: fails on undefined object parameter');

try {
    insert();
} catch (error) {
    console.assert(error instanceof TypeError, 'Error should be a TypeError');
    //console.log(error.message);
}

console.log('CASE 4: fails on 1 as an object parameter');

try {
    insert(1);
} catch (error) {
    console.assert(error instanceof TypeError, 'Error should be a TypeError');
    //console.log(error.message);
}

console.log('CASE 5: fails on undefined as index parameter');

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
};

try {
    insert(colors);
} catch (error) {
    console.assert(error instanceof TypeError, 'Error should be a TypeError');
    //console.log(error.message);
}
