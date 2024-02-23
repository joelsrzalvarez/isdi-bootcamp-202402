function includes(array, value, fromIndex) {
    var targetIndex;

    if (arguments.length < 3)
        targetIndex = 0;
    else {
        if (fromIndex > -1)
            targetIndex = fromIndex;
        else
            targetIndex = array.length + fromIndex;
    }

    for (var i = targetIndex; i < array.length; i++) {
        var element = array[i];
        if (element === value) {
            return true;
        }
    }

    return false
}

//CASE 1
var nums = [100, 200, 300, 400, 500];
var result = includes(nums, 600);
console.assert(result === false, 'case 1 expected to be false');
// false

//CASE 2
var animals = ['pigs', 'goats', 'sheep', 'cows'];
var result = includes(animals, 'sheep');
console.assert(result === true, 'case 2 expected to be true');
// true

//CASE 3
var nums = [10, 20, 30];
var result = includes(nums, 30, 3);
console.assert(result === false, 'case 3 expected to be false');
// false

//CASE 4
var nums = [10, 20, 30];
var result = includes(nums, 30, 1);
console.assert(result === true, 'case 4 expected to be true');
// true

//CASE 5
var animals = ['pigs', 'goats', 'sheep', 'cows'];
var result = includes(animals, 'cows', 2);
console.assert(result === true, 'case 5 expected to be true');
// true

//CASE 6
var animals = ['pigs', 'goats', 'sheep', 'cows'];
var result = includes(animals, 'goats', 2);
console.assert(result === false, 'case 6 expected to be false');
// false

// CASE 7
var animals = ['pigs', 'goats', 'sheep', 'cows']
var result = includes(animals, 'goats', -3)
console.assert(result === true, 'case 7 expected to be true');
// true

//CASE 8
var animals = ['pigs', 'goats', 'sheep', 'cows']
var result = includes(animals, 'goats', -2)
console.assert(result === false, 'case 8 expected to be true');
// false