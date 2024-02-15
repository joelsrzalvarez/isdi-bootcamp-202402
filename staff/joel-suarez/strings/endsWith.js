// TERMINADO
function endsWith(string, searchString) {
    // posicion inicial
    position = string.length;
    var final = position - searchString.length;

    // iterar las comparaciones q son iguales compara las caracteres uno por uno
    for (let i = final; i < position; i++) {
        if (string[i] !== searchString[i - final]) {
            return false;
        }
    }
    return true;
}
