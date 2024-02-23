function reduce(array, callback, initialValue) {
    let acumulador = initialValue !== undefined ? initialValue : array[0];
    const startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < array.length; i++) {
        acumulador = callback(acumulador, array[i], i, array);
    }

    return acumulador;
}

console.log('CASE 1');
var cart = [
    { what: 'socks', price: 14.95, qty: 2, brand: 'adidas' },
    { what: 't-shirt', price: 24.85, qty: 3, brand: 'levis' },
    { what: 'shorts', price: 20.15, qty: 4, brand: 'hilfigher' },
    { what: 'bag', price: 200.05, qty: 1, brand: 'dolce gabbana' }
]

var total = reduce(cart, function (amount, item) {
    //return amount + item['price'] * item['qty']
    return amount + item.price * item.qty
}, 0)

console.assert(total === 385.1, 'Total should be 385.1');

console.log('CASE 2');
var cart = [
    { what: 'socks', price: 14.95, qty: 2, brand: 'adidas' },
    { what: 't-shirt', price: 24.85, qty: 3, brand: 'levis' },
    { what: 'shorts', price: 20.15, qty: 4, brand: 'hilfigher' },
    { what: 'bag', price: 200.05, qty: 1, brand: 'dolce gabbana' }
]

var itemsQty = reduce(cart, function (totalQty, item) {
    return totalQty + item.qty
}, 0)
var average = reduce(cart, function (amount, item, index, cart) {
    return amount + item.price * item.qty / itemsQty
}, 0)
//(14.95 * 2 + 24.85 * 3 + 20.15 * 4 + 200.05 * 1) / (2 + 3 + 4 + 1)
console.assert(average === 38.510000000000005, 'Average should be 38.510000000000005');

console.log('CASE 3');
var nums = [10, 20, 30, 40, 50, 60, 70]
var total = reduce(nums, function (sum, num) {
    return sum + num
});
console.assert(total === 280, 'Total should be 280');

console.log('CASE 4');
var nums = [10, 20, 30, 40, 50, 60, 70]
var total = reduce(nums, function (sum, num) {
    return sum + num
}, 1)
console.assert(total === 281, 'Total should be 281');
