'use strict';

function calculateAge(birthYear) {
  const age = 2037 - birthYear;
  // Available because firstName is in the global scope
  // Doing a lookup in the global scope, finds the variable and prints it
  // console.log(firstName)

  function printAge() {
    let output = `${firstName}, you are ${age} years old, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennial = true;
      const firstName = 'Steven'; // This variable is only available inside this block, and it shadows the firstName variable in the global scope

      // This changes the value of the output variable in the parent scope (printAge function)
      output = 'NEW OUTPUT!';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    // Var is function-scoped, so it is available here, even though it is declared inside the if block
    console.log(millennial);

    // This will cause an error because add is a function declaration inside the if block, and it is not available outside of that block
    //add(2, 3);
  }

  printAge();
}

const firstName = 'Sonya';
calculateAge(1991);

// == Hoisting and the Temporal Dead Zone ==

// Variables
console.log(me);
// Job and year are not hoisted because they are declared with let and const, which are not hoisted like var
// they are in the temporal dead zone until they are declared, so trying to access them before they are
//  declared will cause a ReferenceError
// console.log(job);
// console.log(year);

var me = 'Sonya';
let job = 'teacher';
const year = 1991;

// Functions

// Works because of hoisting, the function declaration is hoisted to the top of the scope,
// so it can be called before it is declared
console.log(addDecl(2, 3));

// Does not work because addExpr is a function expression, and only the variable declaration is hoisted,
//  not the assignment, so it is in the temporal dead zone until it is assigned, and trying to access it
//  before it is assigned will cause a ReferenceError
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

// If we were to use var to declare addExpr and addArrow, they would be hoisted
// and assigned the value of undefined, so trying to call them before they are assigned would
// cause a TypeError because we would be trying to call undefined as a function
const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// Example of hoisting with variables and functions

if (!numProducts) {
  // This will work because numProducts is hoisted and assigned the value of undefined,
  // which is falsy, so the if block will be executed
  deleteProducts();
}

var numProducts = 10;

function deleteProducts() {
  if (!numProducts) {
    console.log('All products deleted!');
  } else {
    console.log('There are still products left.');
  }
}

// This will create a property on the global object (window in browsers) called x, and assign it the value of 1
var x = 1;
// Let and const do not create properties on the global object, so they will not be accessible as properties of the global object
let y = 2;
const z = 3;

// ==== THIS KEYWORD ====

var name = 'Global Name';

const sonya = {
  year: 1991,
  name: 'Sonya',
  calcAge: function () {
    console.log(this);


    // === SOLUTION 1 ===
    
    //  Preserving the this keyword in a variable that can be accessed in the inner function, which is a common pattern before arrow functions were introduced
    // const self = this;

    // const isMillennial = function () {
    //   // This is undefined here because this is a regular function, and in strict mode,
    //   // the this keyword will be undefined in regular functions
    //   console.log(this);
    //   console.log(this.year >= 1981 && this.year <= 1996);

    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    
    // === SOLUTION 2 ===
    const isMillennial = () => {
      // This will work because arrow functions do not have their own this keyword, so they will use the this keyword from the parent scope, which is the calcAge method
      // and in that method, the this keyword points to the sonya object,
      // so this.year will refer to the year property of the sonya object, which is 1991
      console.log(this.year >= 1981 && this.year <= 1996);
    }

    isMillennial();

    return 2037 - this.year;
  },

  // This will not work with Sonya because arrow functions do not have their own this keyword,
  // so they will use the this keyword from the parent scope
  // which in this case is the global scope, so this will be undefined in strict mode
  // and will point to the global object in non-strict mode

  // We will get Hey 'Global Name instead of Hey Sonya because this.name will refer to the name property of the global object
  // which is 'Global Name', and not the name property of the sonya object, which is 'Sonya'
  greet: () => {
    console.log(`Hey ${this.name}`);
  },
};

sonya.calcAge();

// Arrow functions do not have their own this keyword, so they will use the this keyword
// from the parent scope, which in this case is the global scope,
// so this will be undefined in strict mode, and will point to the global object in non-strict mode
const calcAgeArrow = birthYear => {
  console.log(this);
  return 2037 - birthYear;
};

calcAgeArrow(1991);

// In the case of event listeners, the this keyword will point to the element that the event listener is attached to
// document.querySelector('.btn').addEventListener('click', function () {
//   console.log(this);
//   this.style.backgroundColor = 'red';
// });

// In a regular function, the this keyword will be undefined in strict mode, and will point to the global object in non-strict mode
console.log(this);

const matilda = {
  year: 2017,
};

// Method borrowing, we can borrow the calcAge method from the sonya object
// and use it for the matilda object
matilda.calcAge = sonya.calcAge;

// this always points to the object that is calling the method, so in this case, it will point to the matilda object
// even though the method is defined in the sonya object
console.log(matilda.calcAge());

const f = sonya.calcAge;
// In this case, f is a regular function, and the this keyword will be undefined in strict mode
// and will point to the global object in non-strict mode
console.log(f());

// Arrow functions
sonya.greet();
