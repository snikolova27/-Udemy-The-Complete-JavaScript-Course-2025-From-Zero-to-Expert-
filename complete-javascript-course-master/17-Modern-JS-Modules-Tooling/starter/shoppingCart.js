// Exporting module
console.log('Exporting module');

// Blocking code, will block the module in which it is imported
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Fetched users');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, qty) {
  cart.push({ product, qty });
  console.log(`${qty} ${product} was added to the cart`);
};

const totalPrice = 237;
const totalQty = 23;

export { totalPrice, totalQty };

export default function (product, qty) {
  cart.push({ product, qty });
  console.log(`${qty} ${product} was added to the cart`);
}
