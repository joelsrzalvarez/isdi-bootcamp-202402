function lastIndexOf(str, searchValue, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = str.length - 1;
    }
    else if (fromIndex < 0) {
        fromIndex = 0;
    }
    else if (fromIndex >= str.length) {
        fromIndex = str.length - 1;
    }

    for (let i = fromIndex; i >= 0; i--) {
        if (str[i] === searchValue) {
            return i;
        }
    }

    return -1;
}

// test
console.assert(lastIndexOf('hello world', 'l') === 9, 'Test case 1 failed');
console.assert(lastIndexOf('hello world', 'o') === 7, 'Test case 2 failed');
console.assert(lastIndexOf('hello world', 'o', 5) === 4, 'Test case 3 failed');
console.assert(lastIndexOf('hello world', 'x') === -1, 'Test case 4 failed');
