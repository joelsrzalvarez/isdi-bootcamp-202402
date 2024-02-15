function trim(str) {
    var start = 0;
    var end = str.length - 1;
    while (str[start] === ' ') {
        start++;
    }
    while (str[end] === ' ') {
        end--;
    }
    // construir cadena
    var trimStr = '';
    for (var i = start; i <= end; i++) {
        trimStr += str[i];
    }
    return trimStr;
}
