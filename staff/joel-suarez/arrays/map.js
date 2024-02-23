function map(array, callback) {
    var newArray = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        var mappedElement = callback(element)

        newArray[i] = mappedElement
    }

    return newArray
}

// CASE 1
var nums = [1, 4, 9, 16]
var numsX2 = map(nums, function (x) { return x * 2 })
console.assert(JSON.stringify(numsX2) === JSON.stringify([2, 8, 18, 32]), 'case 1 fail');
console.assert(JSON.stringify(nums) === JSON.stringify([1, 4, 9, 16]), 'case 1 nums array was mutated');

// CASE 2
var nums = [10, 20, 30, 40, 50]
var numsX100 = map(nums, function (num) {
    return num * 100
})

console.assert(JSON.stringify(numsX100) === JSON.stringify([1000, 2000, 3000, 4000, 5000]), 'case 2 fail');
console.assert(JSON.stringify(nums) === JSON.stringify([10, 20, 30, 40, 50]), 'case 2 nums array was mutated');

// CASE 3
var chars = ['a', 'b', 'c']
var charsInUpper = map(chars, function (char) {
    return char.toUpperCase()
})

console.assert(JSON.stringify(charsInUpper) === JSON.stringify(['A', 'B', 'C']), 'case 3 fail');
console.assert(JSON.stringify(chars) === JSON.stringify(['a', 'b', 'c']), 'case 3 chars array was mutated');

// CASE 4
var nums = [10, 20, 30]
var result = map(nums, function (element, index, array) {
    return element + ', ' + index + ', [' + array + ']'
})

console.assert(JSON.stringify(result) === JSON.stringify(['10, 0, [10,20,30]', '20, 1, [10,20,30]', '30, 2, [10,20,30]']), 'case 4 fail');
console.assert(JSON.stringify(nums) === JSON.stringify([10, 20, 30]), 'case 4 nums array was mutated');
