function slice(str, start, end) {
    let slicedString = '';
    const length = str.length;

    if (start < 0) {
        start = length + start;
        if (start < 0) {
            start = 0;
        }
    } else if (start >= length) {
        start = length;
    }

    if (end < 0) {
        end = length + end;
        if (end < 0) {
            end = 0;
        }
    }
    else if (end > length) {
        end = length;
    }

    for (let i = start; i < end; i++) {
        slicedString += str[i];
    }

    return slicedString;
}

// Ejemplo de uso
console.log(customSlice('hello world', 3, 7)); // Devuelve 'lo w'
console.log(customSlice('hello world', 3)); // Devuelve 'lo world' (desde el índice 3 hasta el final)
console.log(customSlice('hello world', -5, -1)); // Devuelve 'worl'
console.log(customSlice('hello world', -5)); // Devuelve 'world' (desde el índice -5 hasta el final)
console.log(customSlice('hello world', 0, 5)); // Devuelve 'hello'
