function startsWith(searchString, inicio) {
    position = 0;
    // Itera desde la posición de inicio y compara los caracteres uno por uno
    for (var contInit = position, j = 0; contInit < searchString.length && j < inicio.length; contInit++, j++) {
        if (searchString[contInit] !== inicio[j]) {
            return false;
        }
    }
    return true;
}

