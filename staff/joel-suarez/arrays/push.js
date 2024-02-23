// Eliminar el método push del prototipo Array para evitar conflictos
delete Array.prototype.push;

// Función push personalizada
function push(array, element) {
    var length = array.length;
    array[length] = element;
    array.length = length + 1;
    return array;
}

//CASE 1
var nums = [100, 200, 300, 400, 500];
var length = push(nums, 600);
console.assert(length === 6, 'Length should be 6 after pushing');
console.assert(JSON.stringify(nums) === JSON.stringify([100, 200, 300, 400, 500, 600]), 'Array should be [100, 200, 300, 400, 500, 600] after pushing');

//CASE 2
var animals = ['pigs', 'goats', 'sheep'];
var length = push(animals, 'cows');
console.assert(length === 4, 'Length should be 4 after pushing');
console.assert(JSON.stringify(animals) === JSON.stringify(['pigs', 'goats', 'sheep', 'cows']), "Array should be ['pigs', 'goats', 'sheep', 'cows'] after pushing");

//CASE 3
var sports = ['soccer', 'baseball'];
var length = push(sports);
console.assert(length === 2, 'Length should be 2 after pushing');
console.assert(JSON.stringify(sports) === JSON.stringify(['soccer', 'baseball']), "Array should be ['soccer', 'baseball'] after pushing");

//CASE 4
var sports = ['soccer', 'baseball'];
var length = push(sports, undefined);
console.assert(length === 3, 'Length should be 3 after pushing');
console.assert(JSON.stringify(sports) === JSON.stringify(['soccer', 'baseball', undefined]), "Array should be ['soccer', 'baseball', undefined] after pushing");

//CASE 5
var nums = [10, 20, 30];
var length = nums.push(40, 50, 60);
console.assert(length === 6, 'Length should be 6 after using Array.prototype.push');
console.assert(JSON.stringify(nums) === JSON.stringify([10, 20, 30, 40, 50, 60]), 'Array should be [10, 20, 30, 40, 50, 60] after using Array.prototype.push');
