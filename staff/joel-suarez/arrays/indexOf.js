// Eliminar el método indexOf del prototipo Array para evitar conflictos
delete Array.prototype.indexOf;

// Definir la función indexOf
function indexOf(searchElement, fromIndex) {
    for (var i = 0; i < searchElement.length; i++) {
        if (searchElement[i] == fromIndex) {
            return i;
        }
    }
    return -1;
}

var array = [2, 9, 9];
console.assert(indexOf(array, 2) === 0, "index of 2 should be 0");
console.assert(indexOf(array, 1) === -1, "index of 1 should be -1");
console.assert(indexOf(array, 9) === 1, "index of 9 should be 1");
console.assert(indexOf(array, -1) === -1, "index of -1 should be -1");
