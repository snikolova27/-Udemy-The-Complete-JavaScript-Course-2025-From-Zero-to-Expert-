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

// ==== ES6 Classes ====

// 1. Classes are NOT hoisted - we cannot use them before their declaration
// 2. Classes are first-class citizens (can pass to and return from functions)
// 3. Classes are executed in strict mode

// Class expression
//const PersonCl = class {}

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    // Since we now have a setter for full name, each time the constructor is called,
    // the setter will be executed
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // === Instance methods ===
  // Still prototypal inheritance
  // Methods will be added to the .prototype property
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  }

  // This works because we have a getter for _fullName
  greet() {
    console.log(`Hey ${this.fullName}!`);
  }

  // === Getters and setters ===
  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  // Gives us access to fullName
  get fullName() {
    return this._fullName;
  }

  // === Static methods ===
  static wave() {
    console.log('👋 from PersonCl');
  }
}

const jessica = new PersonCl('Jessica Davis', 1998);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

// Adding a method through .prototype still works
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}!`);
// };
jessica.greet();

// Will result in alert
// const walter = new PersonCl('Walter', 1970);

// === Static methods ====
PersonCl.hey = function () {
  console.log('Hey there! 👋');
  console.log(this); // the entire constructor function
};

PersonCl.hey();
// Will result in error, as the hey method is not part of the prototype
//jessica.hey();
PersonCl.wave();

/*
const account = {
  owner: 'Jonas',
  movements: [200, 300, 5, -90],

  // Getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // Every setter needs to have exactly one argumnet
  set latest(mov) {
    this.movements.push(mov);
  },
};

// We write it as if it is a property
console.log(account.latest);
account.latest = 50;
console.log(account.movements);

console.log(jessica.age);
*/

// === Object.create() ===
// Manually set the prototype of an object

const PersonProto = {
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Link the prototype we want to use
const steven = Object.create(PersonProto);
steven.firstName = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// === Inheritance ===
// With constructor functions

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Student inherits from Person
// It's important to inherit before adding new methods to Student because Object.create will return {}
Student.prototype = Object.create(Person.prototype);
// Otherwise, it will point to Person
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Compute Science');
mike.introduce();
mike.calcAge();
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__ === Person.prototype);

console.log(mike instanceof Person);
console.log(mike instanceof Student);

// === Using constructor functions for inheritance ===
class StudentCl extends PersonCl {
  // We could have no constructor at all if the arguments were only fullName and birthYear
  // meaning we add no additional properties
  constructor(fullName, birthYear, course) {
    // Always needs to happen first! Responsible for creating the this keyword
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Overwrite parent method due to polymorphism
  calcAge() {
    const actualAge = new Date().getFullYear() - this.birthYear;
    console.log(
      `I'm ${actualAge} years old, but as a student I feel more like ${actualAge + 10}`,
    );
  }
}

const martha = new StudentCl('Martha Jones', 1989, 'Computer Science');
martha.introduce();
martha.calcAge();

// === Inheritance with Object.create() ===

const john = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jayStudent = Object.create(StudentProto);
jayStudent.init('Jay', 1989, 'Biology');
jayStudent.introduce();
jayStudent.calcAge();

// === Encapsulation ===
// Private class fields to ensure data privacy

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// STATIC version of above 4 - static methods are not accessible from the instance. not inherited from the prototype

class Account {
  // Public fields
  locale = navigator.language;
  bank = 'Bankist';

  // Private fields
  #movements = [];
  #pin;
  #owner;
  #currency;

  constructor(owner, currency, pin) {
    this.#owner = owner;
    this.#currency = currency;
    this.#pin = pin;

    // this.movements = [];
    //this.locale = navigator.language;
    // this.bank = 'Bankist'

    console.log(`Thanks for opening an account, ${this.#owner}!`);
  }

  // Private methods
  #approveLoan(val) {
    // Fake method
    return true;
  }

  // Public interface (API)
  getMovements() {
    return this.#movements;
    // Not chainable
  }

  deposit(val) {
    this.#movements.push(val);
    // Returning to allow chaining
    return this;
  }

  withdrawal(val) {
    this.deposit(-val);
    // Returning to allow chaining
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan for ${val} approved!`);
    } else {
      console.log(`Loan could not be approved`);
    }
    // Returning to allow chaining
    return this;
  }

  // Static methods
  static test() {
    console.log('Test static method');
  }

  static #testPrivate() {
    console.log('Private test static method');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
// acc1.movements.push(250);
// acc1.movements.push(-35);
acc1.deposit(2560);
acc1.withdrawal(140);
acc1.requestLoan(4000);
console.log(acc1);

Account.test();

acc1
  .deposit(2560)
  .withdrawal(200)
  .requestLoan(100)
  .deposit(20)
  .requestLoan(400)
  .getMovements();

console.log(acc1);
