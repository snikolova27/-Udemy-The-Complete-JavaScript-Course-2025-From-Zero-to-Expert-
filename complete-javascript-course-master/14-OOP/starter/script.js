'use strict';

// ==== Construction function =====
// arrow function cannot be used as a constructor function
// because it does not have its own this keyword
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this because each instance will then carry around this function
  //   this.calcAge = function () {
  //     const now = new Date();
  //     console.log(now.getFullYear() - this.birthYear);
  //   };
};

const sonya = new Person('Sonya', 2001);
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} is linked to prototype, creates __proto__
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2000);
const pesho = new Person('Pesho', 2001);

console.log(sonya, matilda, pesho);
const jay = 'Jay';
console.log(sonya instanceof Person);
console.log(jay instanceof Person);

// =====  Prototypes =====
console.log(Person.prototype);
// Only one copy of the calcAge function exists
Person.prototype.calcAge = function () {
  const now = new Date();
  console.log(now.getFullYear() - this.birthYear);
};

sonya.calcAge();
matilda.calcAge();

console.log(sonya.__proto__);
console.log(sonya.__proto__ === Person.prototype);
console.log(sonya.__proto__ === Person.__proto__);
console.log(Person.prototype.isPrototypeOf(sonya));
console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype === prototype of linked objects
Person.prototype.species = 'Homo Sapiens';
console.log(sonya.species, matilda.species);

console.log(sonya.hasOwnProperty('species'));
console.log(sonya.hasOwnProperty('firstName'));
console.log(sonya.__proto__.__proto__); // Object prototype
console.log(sonya.__proto__.__proto__.__proto__); // null

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [3, 4, 5, 234, 234, 4, 4, 4]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// Generally not a good idea
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());
