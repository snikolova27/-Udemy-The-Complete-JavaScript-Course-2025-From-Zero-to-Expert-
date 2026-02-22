'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section

// === ENHANCED OBJECT LITERALS ===

const weekDaysEnhanced = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

// 1.  We can calculate property names
const openingHours = {
  [weekDaysEnhanced[3]]: {
    open: 12,
    close: 22,
  },
  [weekDaysEnhanced[4]]: {
    open: 11,
    close: 23,
  },
  [weekDaysEnhanced[6]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // 2. simpler syntax for writing methods
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`,
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIng, ...otherIngredients) {
    console.log(
      `Here is your pizza with ${mainIng}, ${otherIngredients.join(', ')}.`,
    );
  },

  //3. ES6 enhanced object literals
  openingHours,
};

const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

const [x, y, z] = arr;
console.log({ x, y, z });
console.log({ arr });

const [first, second] = restaurant.categories;

console.log({ first, second });

let [main, , secondary] = restaurant.categories;
console.log({ main, secondary });

// Switching variables
[main, secondary] = [secondary, main];
console.log({ main, secondary });

const [starter, mainCourse] = restaurant.order(2, 0);
console.log({ starter, mainCourse });

// Nested destructuring
const nested = [2, 4, [5, 6]];

// const [ i, , j] = nested
// console.log(i, j)

const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

// Objects
const { name, openingHours: openingHours1, categories } = restaurant;
console.log({ name, openingHours1, categories });

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log({ restaurantName, hours, tags });

// Defaults in object destructuring
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log({ menu, starters });

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// Does not work without parentheses as JS expects an expression
({ a, b } = obj);
console.log({ a, b });

// Nested object
const {
  fri: { open: fridayOpeningHours, close: fridayClosingHours },
} = openingHours;
console.log({ fridayOpeningHours, fridayClosingHours });

restaurant.orderDelivery({
  time: '22:30',
  address: 'my house',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'my house',
  mainIndex: 2,
});

// === SPREAD OPERATOR ===
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log({ badNewArr });

const newArr = [1, 2, ...arr];
console.log({ newArr });

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log({ newMenu });

// Copy array
// Shallow copy
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const joinedMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// Iterables: arrays, maps, strings, sets, NOT OBJECTS
const str = 'Sonya';
const letters = [...str, ' ', 'N.'];
console.log(letters);
console.log(...str);

// Below will not work as this is unexpected
// console.log(`${...str} won't work`)

// Example

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];

// console.log({ ingredients });
// restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { ...restaurant, founder: 'Giuseppe', foundedIn: 1989 };
console.log({ newRestaurant });

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Soni's restaurant";
console.log(restaurantCopy.name);
console.log(restaurant.name);

// === REST OPERATOR ===

// 1) Destructing
// SPREAD because on the right side of =
const arr1 = [1, 2, ...[3, 4]];

// REST, because on left side of =
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others);

// Combined spread and rest
// REST should always be last
const [pizza, , Risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log({ pizza, Risotto, otherFood });

// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log({ weekDays });

// 2) Functions
const add = (...numbers) => {
  // console.log(numbers)
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  console.log(sum);
  return sum;
};

add(2, 3);
add(5, 4, 7);
add(2, 5, 6, 66, 2, 6);

const tempArr = [23, 5, 7];
add(...tempArr);

restaurant.orderPizza('tomato', 'ham', 'olives', 'zucchini');

// SHORT CIRCUIT WITH && AND ||
console.log('---- OR OPERATOR ----');
// If the first value is a truthy value, the other operand will not be evaluated
console.log(3 || 'Sonya');

console.log('' || 'Soni'); // Returns Soni
console.log(true || 0); // Returns true
console.log(undefined || null); // Returns null

console.log(undefined || 0 || '' || 'Hello' || 23); // Returns Hello

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log({ guests1 });

restaurant.numGuests = 23;
const guests2 = restaurant.numGuests || 10;
console.log({ guests2 });

console.log('---- AND OPERATOR ----');
console.log(0 && 'Soni');
console.log(7 && 'Soni');

console.log('Hello' && 23 && null && 'Soni'); // Returns null

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('tomato', 'mozzarella');

// ==== For of loop ====

for (const item of joinedMenu) {
  console.log({ item });
}

// Produces an array of arrays containing position and value of each entry
for (const [position, item] of joinedMenu.entries()) {
  console.log(`${position + 1}. ${item}`);
}
