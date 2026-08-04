// import {
//   addToCart,
//   totalPrice as price,
//   totalQty as quantity,
// } from './shoppingCart.js';

// Import everything from the module
import * as ShoppingCart from './shoppingCart.js';
console.log('Importing module');

ShoppingCart.addToCart('apples', 3);
console.log(ShoppingCart.totalPrice, ShoppingCart.totalPrice);

// Importing the default export value from the module
import add from './shoppingCart.js';
add('pizza', 2);

// imports are a live connection, they are not copies of the exported values
console.log(ShoppingCart.cart);

// Top-level await is only allowed in modules
// However, it blocks the execution of the whole module
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log({ data });
// console.log('This is printed after posts data is fetched successfully');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// const lastPost = await getLastPost();
// console.log(lastPost);

// ===== Module pattern =====
// works thanks to closures => addToCart never loses connection to its birthplace
// so it can still access cart and manipulate it
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 234;
  const totalQty = 83;

  const addToCart = function (product, qty) {
    cart.push({ product, qty });
    console.log(`${qty} ${product} was added to the second cart`);
  };

  const orderStock = function (product, qty) {
    console.log(`${qty} ${product} ordered from supplier`);
  };

  return { addToCart, cart, totalPrice, totalQty };
})();

ShoppingCart2.addToCart('apples', 43);
console.log(ShoppingCart2.cart);

// ===== CommonJS =====
/*
// Does not work in the browser, works in NodeJS
export.addToCart = function (product, qty) {
  cart.push({ product, qty });
  console.log(`${qty} ${product} was added to the cart`);
};

// Import - not supported in the browser, only in NodeJS
const {addToCart } = require('./shoppingCart.js')
*/

import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', qty: 4 },
    { product: 'pizza', qty: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
//state.user.loggedIn = false;
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

class Person{
  #greeting = 'Hey'
  constructor(name){
    this.name = name;
    console.log(`${this.#greeting}, ${name}`)
  }
}

const josh = new Person('Josh')
Promise.resolve('TEST').then(x => console.log(x))

import 'core-js/stable';
// Polyfilling async functions
import 'regenerator-runtime'