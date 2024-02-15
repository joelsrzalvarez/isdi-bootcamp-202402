delete Array.prototype.concat;

function concat(param) {
    var newArray = [];
    var newArrayIndex = 0;
    for (var i = 0; i < param.length; i++) {
        newArray[newArrayIndex++] = param[i];
    }
    for (var j = 0; j < arguments.length; j++) {
        var arg = arguments[j];
        newArray[newArrayIndex++] = arg;
    }
    return newArray;
}

// test
var array1 = [1, 2, 3];
var array2 = [4, 5];

var concatenatedArray = concat(array1, array2);
console.log(concatenatedArray); 
