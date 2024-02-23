/**
 * Extracts many elements that match the condition from an iterable object.
 *
 * @param object - The iterable object to mutate.
 * @param callback - The function used to filter elements.
 * @returns {object} - The extracted elements as a new object.
 * 
 * @throws {TypeError} When object is not an object.
 */
function extractMany(object, callback) {
    console.assert(typeof object === 'object', 'El primer argumento debe ser un objeto.');

    var extracted = {};
    var length = 0;

    for (var key in object) {
        if (!!callback(object[key])) {
            extracted[length] = object[key];
            length++;
        } else {
            object.length--;
        }
    }

    extracted.length = length;
    return extracted;
}

var users = {
    0: { name: 'Wendy', age: 19 },
    1: { name: 'Peter', age: 20 },
    2: { name: 'Pepito', age: 50 },
    3: { name: 'Campa', age: 30 },
    4: { name: 'James', age: 40 },
    length: 5
};

var extracted = extractMany(users, function (user) {
    return user.age > 25;
});

console.assert(extracted[0].age === 50, 'primera persona extraida deberia tener una edad mayor a 25.');
console.assert(extracted[1].age === 30, 'segunda persona extraida deberia tener una edad mayor a 25.');
console.assert(extracted[2].age === 40, 'tercera persona extraida deberia tener una edad mayor a 25.');

console.assert(users[0].age === 19, 'La edad de la primera persona no deberia haber cambiado.');
console.assert(users[1].age === 20, 'La edad de la segunda persona no deberia haber cambiado.');