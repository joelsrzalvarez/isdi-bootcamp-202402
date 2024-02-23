delete Array.prototype.pop;

function pop(array) {
    var lastIndex = array.length - 1;
    var lastElement = array[lastIndex];
    array.length--;
    return lastElement;
}

// CASE 1
var nums = [100, 200, 300, 400, 500];
var num = pop(nums);
console.assert(nums.length === 4, 'length should be 4 after popping');

// CASE 2
var animals = ['pigs', 'goats', 'sheep', 'cows'];
var animal = pop(animals);
console.assert(animal === 'cows', "pop element should be 'cows'");
console.assert(animals.length === 3, 'length should be 3 after popping');

// CASE 3
var sports = ['soccer', 'baseball'];
var sport = pop(sports);
console.assert(sport === 'baseball', "popped element should be 'baseball'");
console.assert(sports.length === 1, 'length should be 1 after popping');

// CASE 4
var sports = [];
var sport = pop(sports);
console.assert(sport === undefined, "pop element should be undefined");
console.assert(sports.length === 0, 'length should be 0 after popping');
