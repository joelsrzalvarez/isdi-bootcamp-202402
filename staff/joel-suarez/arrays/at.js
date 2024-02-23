delete Array.prototype.at;

function at(array, index) {
    var targetIndex = index > -1 ? index : array.length + index;
    var element = array[targetIndex];
    return element;
}

//CASE 1
var nums = [100, 200, 300, 400, 500];
var num = at(nums, 3);
console.assert(num === 400, 'num should be 400');
// 400


//CASE 2
var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o'];
var char = at(chars, 4);
console.assert(char === ' ', 'char should return: ');
// ' '

//CASE 3
var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o'];
var char = at(chars, -3);
console.assert(char === 'n', 'char should return n');
// 'n'

//CASE 4
var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o'];
var char = at(chars, -30);
console.assert(char === undefined, 'char should return undefined');
// undefined