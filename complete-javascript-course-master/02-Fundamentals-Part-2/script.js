"use strict";

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive :D");

// Function declaration
function logger() {
  console.log("My name is Sonya");
}

// calling / running / invoking function
logger(23);
logger();
logger();

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

// Function declaration
// birthyear is a parameter -> a placeholder we use in the function definition
function calcAge1(birthYear) {
  return 2026 - birthYear;
}

//1991 is an argument -> actual value we pass into the function
const age1 = calcAge1(1991);
console.log(age1);

// Function expression
const calcAge2 = function (birthYear) {
  return 2026 - birthYear;
};

const age2 = calcAge2(1991);
console.log(age1, age2);

// Functions are just values

// Expression vs Declarations

// We can call a function DECLARATION before it is defined in the code, because of the way JavaScript works (hoisting)
// We cannot call function expression before it is defined in the code, because it is not hoisted

// Arrow function
const calcAge3 = (birthYear) => 2026 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2026 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years.`;
};

console.log(yearsUntilRetirement(1991, "Sonya"));

// Arrow functions DO NOT get a this keyword, so they are not suitable for methods.
// They also DO NOT get the arguments keyword, so they are not suitable for functions that need to access the arguments object.
// They also CANNOT be used as constructors, so they are not suitable for functions that need to be called with the new keyword.

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProcessor(2, 3));

const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

const years = new Array(1991, 1984, 2008, 2020);
console.log(years);

console.log(friends[0]);
console.log(friends[2]);

// .length is a property of arrays
console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "Jay";
console.log(friends);

// friends = ["Bob", "Alice"]; // This will not work because we cannot reassign a new array to a const variable, but we can change the contents of the array.

const firstName = "Sonya";
const sonyaArray = [firstName, "Smith", 2026 - 1991, "teacher", friends];
console.log(sonyaArray);

calcAge3(years[0]);
calcAge3(years[1]);
calcAge3(years[2]);
calcAge3(years.length - 1);

const ages = [
  calcAge3(years[0]),
  calcAge3(years[1]),
  calcAge3(years[2]),
  calcAge3(years[years.length - 1]),
];
console.log(ages);

// Add elements to array
friends.push("Jay");
console.log(friends);

// unshift adds element to the beginning of the array, while push adds element to the end of the array
friends.unshift("John");
console.log(friends);

// Remove elements from array
friends.pop(); // removes last element
console.log(friends);

friends.shift(); // removes first element
console.log(friends);

console.log(friends.indexOf("Steven")); // returns the index of the element in the array, or -1 if the element is not found

console.log(friends.includes("Steven")); // returns true if the element is in the array, and false if it is not
console.log(friends.includes("Bob"));

if (friends.includes("Steven")) {
  console.log("You have a friend called Steven");
}

const sonya = {
  firstName: "Sonya",
  lastName: "Smith",
  age: 2026 - 1991,
  job: "teacher",
  friends: ["Michael", "Steven", "Peter"],
};

console.log(sonya);

console.log(sonya.firstName);
// We can use dot notation to access properties of an object, but we can also use bracket notation, which is more flexible because we can use expressions to access properties.
console.log(sonya["lastName"]);

const nameKey = "Name";
console.log(sonya["first" + nameKey]);
console.log(sonya["last" + nameKey]);

// console.log(sonya.first + nameKey); // This will not work because it will look for a property called firstName, which does not exist.

const interestedIn = prompt(
  "What do you want to know about Sonya? Choose between firstName, lastName, age, job, and friends.",
);

if (sonya[interestedIn]) {
  // sonya.interestedIn will not work because it will look for a property called interestedIn, which does not exist.
  // We need to use bracket notation to access the property that is stored in the variable interestedIn.
  console.log(sonya[interestedIn]);
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, age, job, and friends.",
  );
}

sonya.location = "Bulgaria";
sonya["twitter"] = "@sonya_smith";
console.log(sonya);

// Challenge
// "Sonya has 3 friends, and her best friend is called Michael."
console.log(
  `${sonya.firstName} has ${sonya.friends.length} friends, and her best friend is ${sonya.friends[0]}`,
);

const sonya2 = {
  firstName: "Sonya",
  lastName: "Smith",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Steven", "Peter"],
  hasDriversLicense: true,

  // We can also add methods to objects, which are functions that are properties of the object. We can use the this keyword to access other properties of the object from within the method.
  // calcAge: function () {
  //   return 2026 - this.birthYear;
  // },

  calcAge: function () {
    this.age = 2026 - this.birthYear; // We can also add new properties to the object from within the method, which is not a good practice, but it is possible.
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year-old ${this.job}, and she has ${
      this.hasDriversLicense ? "a" : "no"
    } driver's license.`;
  }
};

console.log(sonya2.calcAge());
console.log(sonya2["calcAge"]());

console.log(sonya2.age);
console.log(sonya2.getSummary());


// Exercise
/* Write your code below. Good luck! 🙂 */


const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height)
        return this.bmi
    }
}

 const john = {
     fullName: 'John Smith',
     mass:92,
     height:1.95,
     calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height)
        return this.bmi
    }
 }
 
const markBMI = mark.calcBMI();
const johnBMI = john.calcBMI();

if(johnBMI > markBMI){
    console.log(`John Smith's BMI (${john.bmi}) is higher than Mark Miller's (${mark.bmi})!`)
}else{
     console.log(`Mark Miller's BMI (${mark.bmi}) is higher thanJohn Smith's (${john.bmi})!`)
}


for(let rep = 1; rep <= 10; rep++){
    console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

const sonyaArray2 = [
    'Sonya',
    'Smith',
    2026 - 1991,
    'teacher',
    ['Michael', 'Steven', 'Peter']
]

const types = [];

for(let i = 0; i < sonyaArray2.length; i++){
    console.log(sonyaArray2[i], typeof sonyaArray2[i]);
    // types[i] = typeof sonyaArray2[i];
    types.push(typeof sonyaArray2[i]);
}

console.log(types);

const years2 = [1991, 2007, 1969, 2020];
const ages2 = [];

for(let i = 0; i < years2.length; i++){
    ages2.push(2026 - years2[i]);
}

console.log(ages2);

console.log('--- ONLY STRINGS ---');
for(let i = 0; i < sonyaArray2.length; i++){
    if(typeof sonyaArray2[i] !== 'string') continue;
    console.log(sonyaArray2[i], typeof sonyaArray2[i]);
}

console.log('--- BREAK WITH NUMBER ---');
for(let i = 0; i < sonyaArray2.length; i++){
    if(typeof sonyaArray2[i] === 'number') break;
    console.log(sonyaArray2[i], typeof sonyaArray2[i]);
}

for(let i = sonyaArray2.length - 1; i >= 0; i--){
    console.log(i, sonyaArray2[i]);
}

for(let exercise = 1; exercise <= 3; exercise++){
    console.log(`--- Starting exercise ${exercise} ---`);
    for(let rep = 1; rep <= 5; rep++){
        console.log(`Exercise ${exercise}: Lifting weights repetition ${rep} 🏋️‍♀️`);
    }
}

let rep = 1;
while(rep <= 10){
    console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while(dice !== 6){
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if(dice === 6) console.log('Loop is about to end...');
}


// Code Challenge #4
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

/* Write your code below. Good luck! 🙂 */

const bills = [ 22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]
const tips = []
const totals = [];

for(let i = 0; i<= bills.length; i++){
    tips.push(calcTip(bills[i]));
    totals.push(tips[i] + bills[i]);
}


const calcAverage = (arr) => {
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    
    return sum / arr.length
}

calcAverage(totals)