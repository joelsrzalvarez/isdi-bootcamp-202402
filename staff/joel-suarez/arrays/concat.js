delete Array.prototype.concat;

function concat() {
    var newArray = [];
    for (var i = 0; i < arguments.length; i++) {
        var array = arguments[i];
        for (var j = 0; j < array.length; j++) {
            var element = array[j];
            newArray.push(element); // Puedes usar newArray.push(element) para agregar elementos al nuevo array.
        }
    }
    return newArray;
}

// CASE 1
var nums = [100, 200, 300, 400, 500];
var animals = ['pigs', 'goats', 'sheep', 'cows'];
var result = concat(nums, animals);
console.assert(result.length === 9, 'Length should return 9 instead');
console.assert(JSON.stringify(result) === JSON.stringify([100, 200, 300, 400, 500, 'pigs', 'goats', 'sheep', 'cows']), 'CASE 1');

// CASE 2
var nums = [];
var animals = [];
var result = concat(nums, animals);
console.assert(result.length === 0, 'Length should return 0');
console.assert(JSON.stringify(result) === JSON.stringify([]), 'CASE 2');

//CASE 3
var nums = [100, 200, 300, 400, 500];
var animals = ['pigs', 'goats', 'sheep', 'cows'];
var fruits = ['apples', 'bananas', 'oranges', 'lemons'];
var cars = ['lambo', 'ferra', 'merce', 'porsc'];
var result = concat(nums, animals, fruits, cars);

// Comparar el resultado usando JSON.stringify para comparar arrays
console.assert(JSON.stringify(result) === JSON.stringify(['pigs', 'goats', 'sheep', 'cows', 'apples', 'bananas', 'oranges', 'lemons', 'lambo', 'ferra', 'merce', 'porsc']), 'Case 3');