'use strict';

// ~~~~~ FUNCTIONS ~~~~~

// ==== Default parameters ====
const bookings = [];

const createBooking = (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers,
) => {
  // ES5
  // numPassengers = numPassengers || 1
  // price = price || 199
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);

// We cannot skip arguments, we need to set them to undefined
createBooking('LH123', undefined, 1000);

// ===== Value vs Reference =====

const flight = 'LHJ234';
const sonya = {
  name: 'Sonya Ni',
  passport: 939393934,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Ms. ' + passenger.name;

  if (passenger.passport === 939393934) {
    console.log('Checked in');
  } else {
    console.log('Wrong passport');
  }
};

checkIn(flight, sonya);
// flight is still LHJ23
console.log(flight);
// passenger.name is changed to Ms. Sonya Ni
// objects are passed as a reference, we are copying the reference to it
console.log(sonya);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

newPassport(sonya);
// Wrong passport
checkIn(flight, sonya);

// !! In JS there is no actual passing by reference, even for objects!
// We are passing the value that is storing the address to the object,
// similar to a pointer in C++

// ===== Higher-order and first-class functions =====

// First-class: JS treats functions as first=class citizens, all functions are values, just another type of objects
// High-order = receives another function as an argument, that returns a function or both

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JS is the best!', oneWord);

// Callbacks
const high5 = () => console.log('👋');

document.body.addEventListener('click', high5);

['Soni', 'Mimi', 'Sami'].forEach(high5);

// Callbacks allow us to create abstractions!

// Closure
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

const greetArrow = greeting => name => {
  console.log(`${greeting} ${name}`);
};

greetArrow('Hiii')('Soni');

// ===== CALL, APPLY, BIND =====

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });

    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
    );
  },
};

lufthansa.book(234, 'Soni Ni');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// This is undefined
// Not a method anymore, just a function
//book(23, 'Sarah Williams')

// Call method
// Manually set the this keyword
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'SAL',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method
const flightData = [583, 'George Cooper'];

// Following two lines are exactly the same
book.apply(swiss, flightData);
book.call(swiss, ...flightData);
console.log(swiss);

// Bind method
// Bind returns a new function with the this object we've passed to it
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSAL = book.bind(swiss);

bookEW(345, 'Steven Williams');

// Define the parameters of the functions
// Partial applications - part of the arguments are already set
const bookEW23 = book.bind(eurowings, 23);

bookEW23('Sakura Chan');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// Results in NAN because the this keyword points to the button and not the lufthansa object
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// Solution
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial applicatio
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// We don't need the this keyword, so we are setting it to null
const addVAT = addTax.bind(null, 0.23);
// addVat = value => value + value * 0.23
console.log(addVAT(200));

const addTaxWithFunction = rate => value => value + value * rate;
const addVATFunc = addTaxWithFunction(0.23);
console.log(addVATFunc(200));

// ====== Immediately invoked function expressions (IIFE) ======

const runOnce = function () {
  console.log('This will never run again');
};

runOnce();

// IIFE
(function () {
  console.log('This will actually never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate)

(() => console.log('This will ALSO never run again'))();

// ==== CLOSURES ====
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log({ passengerCount });
  };
};

const booker = secureBooking();

// Successfully increments passengerCount
booker();
booker();
booker();

// A closure remembers all the variables that were present at the time the function was created, at its birthplace
// If an object is reachable by a closure it doesn't get garbage collected.
// In a sense, when we have closures, the scope chain is preserved when in reality it is gone

// ~~~ Summary ~~~~
// A closure is the closed-over variable environment of the execution context in which a function was created, even after that execution context is gone;

// A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.

// A closure makes sure that a function doesn't lose connection to variables that existed at the function's birth place
// A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created

// We can see the closure in [[Scopes]]
console.dir(booker);

// Examples of closures

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // console logs 46
console.dir(f);

// Reassigning the f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(() => {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, 1000 * wait);

  console.log(`Will start boarding in ${wait} seconds`);
};

// This will not be used by the closure, the closure has priority over the scope change
const perGroup = 1000;
boardPassengers(180, 3);
