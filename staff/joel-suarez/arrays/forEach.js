function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        callback(element, i, array)
    }
}

//CASE 1
var nums = [10, 20, 30, 40, 50]
var resultsCase1 = [];
forEach(nums, function (num) {
    resultsCase1.push(num);
});
console.assert(JSON.stringify(resultsCase1) === JSON.stringify([10, 20, 30, 40, 50]), 'case 1 failed');

//CASE 2
var nums = [10, 20, 30, 40, 50]
var sum = 0
forEach(nums, function (num) {
    sum += num
})
console.assert(sum === 150, 'case 2 failed');

//CASE 3
var nums = [10, 20, 30, 40, 50]
var resultsCase3 = [];
forEach(nums, function (num, index) {
    resultsCase3.push(num + index);
})
console.assert(JSON.stringify(resultsCase3) === JSON.stringify([10, 21, 32, 43, 54]), 'case 3 failed');

//CASE 4
var nums = [10, 20, 30, 40, 50]
var resultsCase4 = [];
forEach(nums, function (num, index, array) {
    resultsCase4.push(num + index + array.length);
})
console.assert(JSON.stringify(resultsCase4) === JSON.stringify([15, 26, 37, 48, 59]), 'case 4 failed');
