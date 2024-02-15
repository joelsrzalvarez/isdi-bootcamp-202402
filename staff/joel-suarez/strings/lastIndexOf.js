function customLastIndexOf(str, searchValue, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = str.length - 1;
    }
    else if (fromIndex < 0) {
        fromIndex = 0;
    }
    else if (fromIndex >= str.length) {
        /*
         Si fromIndex es mayor o igual a la longitud de la cadena, lo ajustamos al último índice válido
         */
        fromIndex = str.length - 1;
    }

    for (let i = fromIndex; i >= 0; i--) {
        if (str[i] === searchValue) {
            return i;
        }
    }

    return false;
}

// Ejemplo de uso
console.log(customLastIndexOf('hello world', 'l')); // Devuelve 9
console.log(customLastIndexOf('hello world', 'o')); // Devuelve 7
console.log(customLastIndexOf('hello world', 'o', 5)); // Devuelve 4
console.log(customLastIndexOf('hello world', 'x')); // Devuelve -1
