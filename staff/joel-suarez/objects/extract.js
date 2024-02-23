/**
 * Extracts an element that matches the condition from an iterable object.
 *
 * @param object - The iterable object to mutate. 
 * @param index - The index from which to extract a value.
 * 
 * @throws {TypeError} When object is not an object, or when index is not a number.
 */
function extract(object, callback) {
    for (var key in object) {
        if (!!callback(object[key])) {
            var extract = object[key];
            delete object[key];
            object.length--;
            return extract;
        }
    }
    return undefined;
}

console.log('CASE 1: extract user pepito from users');

var users = {
    0: { name: 'Wendy', age: 19 },
    1: { name: 'Peter', age: 20 },
    2: { name: 'Pepito', age: 50 },
    3: { name: 'Campa', age: 30 },
    4: { name: 'James', age: 40 },
    length: 5
};

var user = extract(users, function (user) {
    return user.name === 'Pepito';
});
console.log(users);
console.assert(user[2] === 'Pepito', 'No es Pepito'); // Imprimirá el usuario extraído