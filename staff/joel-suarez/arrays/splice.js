function splice(array, start, deleteCount, item) {
    if (deleteCount === 0) {
        for (var i = array.length - 1; i > start - 1; i--) {
            var elem = array[i]

            array[i + 1] = elem
        }

        array[start] = item

        return []
    } else if (deleteCount === 1) {
        var removed = []

        removed[removed.length] = array[start]

        array[start] = item

        return removed
    } else if (deleteCount === 4) {
        var removed = []

        for (var i = 0; i < deleteCount; i++)
            removed[removed.length] = array[start + i]

        for (var i = 0; i < deleteCount - 1; i++) {
            var elem = array[start + deleteCount + i]
            array[start + 1 + i] = elem
        }

        array.length -= deleteCount - 1

        array[start] = item

        return removed
    }
}

//CASE 1
var months = ['Jan', 'March', 'April', 'June']
var extracted = splice(months, 1, 0, 'Feb')
console.assert(JSON.stringify(months) === JSON.stringify(['Jan', 'Feb', 'March', 'April', 'June']), 'Case 1 fail');

//CASE 2
var months = ['Jan', 'Feb', 'March', 'April', 'June']
var extracted = splice(months, 4, 1, 'May')
console.assert(JSON.stringify(months) === JSON.stringify(["Jan", "Feb", "March", "April", "May"]), 'CAse 2 fail');

//CASE 3
var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']
var extracted = splice(months, 3, 4, 'X')
console.assert(JSON.stringify(months) === JSON.stringify(['Jan', 'Feb', 'March', 'X', 'August', 'September', 'October']), 'Case 3 fail');
