function includes(searchElement, fromIndex) {
    var startIndex;
    fromIndex = fromIndex || 0;
    if (fromIndex >= 0) {
        startIndex = fromIndex;
    } else {
        startIndex = searchElement.length + fromIndex;
    }

    if (startIndex >= 0) {
        startIndex = startIndex;
    } else {
        startIndex = 0;
    }
    for (var i = startIndex; i < searchElement.length; i++) {
        if (searchElement[i] === searchElement) {
            return true;
        }
    }
    return false;
}

var arr = ["a", "b", "c"];
console.log(includes(arr, "c", 3)); // Salida esperada: false
console.log(includes(arr, "c", 2)); // Salida esperada: true

var arr = ["a", "b", "c"];
includes("c", 3);
// Ejemplo de uso
var arr = [1, 2, 3];
console.log(includes(arr, 2)); // Devuelve true
console.log(includes(arr, 4)); // Devuelve false
