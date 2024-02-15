delete Array.prototype.indexOf;

function indexOf(searchElement, fromIndex) {
    for (var i = 0; i < searchElement.length; i++) {
        if (searchElement[i] == fromIndex) {
            return i;
        }
    }
    return -1;
}

var myList = [
    ['Banana', 1],
    ['Apple', 2],
    ['Chocolate', 3],
    ['Pineapple', 4],
    ['Milk', 5]
]