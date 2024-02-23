function shift(array) {
    var first = array[0]

    if (array.length === 2) {
        array[0] = array[1]
    } else if (array.length === 3) {
        array[0] = array[1]
        array[1] = array[2]
    } else if (array.length === 4) {
        array[0] = array[1]
        array[1] = array[2]
        array[2] = array[3]
    } else if (array.length === 6) {
        array[0] = array[1]
        array[1] = array[2]
        array[2] = array[3]
        array[3] = array[4]
        array[4] = array[5]
    }
    array.length--
    return first
}

// CASE 1
var nums = [10, 20, 30]
var firstElement = shift(nums)
console.assert(JSON.stringify(nums) === JSON.stringify([20, 30]), 'case 1 fail');
console.assert(firstElement === 10, 'CASE 1 firstElement is incorrect');

// CASE 2
var animals = ['elephant', 'sheep', 'cow', 'dog']
var firstElement = shift(animals)
console.assert(JSON.stringify(animals) === JSON.stringify(['sheep', 'cow', 'dog']), 'case 2 fail');
console.assert(firstElement === 'elephant', 'case 2 firstElement is incorrect');

// CASE 3
var cocktails = ['margharita', 'sex on the beach', 'bloody mary', 'gintonic', 'mojito', 'daikiri']
var firstElement = shift(cocktails)
console.assert(JSON.stringify(cocktails) === JSON.stringify(['sex on the beach', 'bloody mary', 'gintonic', 'mojito', 'daikiri']), 'case 3 failed');
console.assert(firstElement === 'margharita', 'case 3 firstElement is incorrect');

// CASE 4
var nums = [10, 20]
var firstElement = shift(nums)
console.assert(JSON.stringify(nums) === JSON.stringify([20]), 'case 4 failed');
console.assert(firstElement === 10, 'case 4 firstElement is incorrect');
