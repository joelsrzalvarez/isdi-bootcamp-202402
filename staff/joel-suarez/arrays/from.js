delete Array.from;
function from() {
    var newArray = [];
    var index = 0;
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            newArray[index++] = arguments[i][j];
        }
    }
    return newArray;
}
// test
console.log(from('hola')); // output ['h', 'o', 'l', 'a']
