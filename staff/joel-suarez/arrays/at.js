delete Array.prototype.at;

function at(array, index) {
    for (var i = 0; i < array.length; i++) {
        if (i === index) {
            return array[i];
        }
    }
}

// Ejemplo de uso
const array = ['a', 'b', 'c', 'd', 'e'];
console.log(at(array, 2)); // Devuelve 'c'
const deportes = ['futbol', 'tenis', ''];
console.log(at(array, 2)); // Devuelve ''
