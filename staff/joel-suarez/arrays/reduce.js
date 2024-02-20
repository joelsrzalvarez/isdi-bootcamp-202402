function miReduce(array, callback, initialValue) {
    let acumulador = initialValue !== undefined ? initialValue : array[0];
    const startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < array.length; i++) {
        acumulador = callback(acumulador, array[i], i, array);
    }

    return acumulador;
}
