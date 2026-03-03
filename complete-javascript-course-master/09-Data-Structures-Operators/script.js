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
  Fri: { open: fridayOpeningHours, close: fridayClosingHours },
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

// === OPTIONAL CHAINING ===
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

// With optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['Mon', 'Tue', 'Wed', ' Thu', 'Fri', 'Sat', 'Sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(
  restaurant.order?.(0, 2) ?? 'Method order does not exist in restaurant',
);
console.log(
  restaurant.orderRisotto?.(0, 1) ??
    'Method orderRisotto does not exist in restaurant',
);

// Arrays
const users = [{ name: 'Soni', email: 'sonisemail@gmail.com' }];
console.log(users[0]?.name ?? 'Users array is empty');

// Looping Objects: Object Keys, Values and Entries
// Property NAMES
const properties = Object.keys(openingHours);
console.log({ properties });

console.log(`We are open on ${properties.length} days`);

let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) {
  console.log(day);
  openStr += `${day}, `;
}

console.log({ openStr });

// Property VALUES
const values = Object.values(openingHours);
console.log({ values }); // returns [{open, close}] for all 3 days

// Entire object
const objEntries = Object.entries(openingHours);
console.log({ objEntries });

for (const [key, { open, close }] of objEntries) {
  console.log(`On ${key} we open at ${open} and close at ${close}.`);
}

// ===== SETS =====
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size,
);

console.log(new Set('jonasschmedtmann').size);

const commonFoods = italianFoods.intersection(mexicanFoods);
console.log('Intersection:', commonFoods);
console.log([...commonFoods]);

const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log('Union:', italianMexicanFusion);

console.log([...new Set([...italianFoods, ...mexicanFoods])]);

const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log('Difference italian', uniqueItalianFoods);

const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log('Difference mexican', uniqueMexicanFoods);

const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log(uniqueItalianAndMexicanFoods);

console.log(italianFoods.isDisjointFrom(mexicanFoods));

// ==== MAPS ====

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const arr3 = [1, 2];
rest.set(arr3, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr3));

// Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

// ==== STRINGS ====

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B747'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));
console.log(airline.indexOf('portugal'));

// Starts at position 4 until the end
console.log(airline.slice(4)); // -> AIR Portugal
console.log(airline.slice(4, 7)); // -> AIR, the last index is not included

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ' + 1)));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

// B and E are middle seats
const checkMiddleSeat = seat => {
  const letter = seat.slice(-1);
  if (letter === 'E' || letter === 'B') {
    console.log('You got the middle seat :(');
  } else {
    console.log('You got lucky!');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));
console.log(typeof new String('jonas').slice(1));

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const fixPassengerName = passenger => {
  const passengerLower = passenger.toLowerCase();
  const passengerCorrect =
    passengerLower[0].toUpperCase() + passengerLower.slice(1);
  console.log(passengerCorrect);

  return passengerCorrect;
};
fixPassengerName('jOnAS');

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '    Hello@Jonas.Io\n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log({ trimmedEmail });

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log({ normalizedEmail });

const compareEmails = (email, loginEmail) => {
  const normalizedEmail = loginEmail.toLowerCase().trim();
  return normalizedEmail === email;
};

// Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(', ', '.');
console.log({ priceUS });

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
// Replaces only the very first appearance of the string
console.log(announcement.replace('door', 'gate'));
// Replaces every appearance of the string
console.log(announcement.replaceAll('door', 'gate'));
// Replaces every appearance of the string with a Regex
console.log(announcement.replace(/door/g, 'gate'));

const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('Air'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// Practice exercise
const checkBaggage = items => {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

console.log('a+very+nice+string'.split('+'));
console.log('Sonya Nikolova'.split(' '));

const [firstName, lastName] = 'Sonya Nikolova'.split(' ');

const newName = ['Ms.', firstName, lastName.toUpperCase()].join(' ');
console.log({ newName });

const capitalizeName = name => {
  const nameSplit = name.toLowerCase().split(' ');
  const namesUpper = [];

  for (const n of nameSplit) {
    //  namesUpper.push(n[0].toUpperCase() + n.slice(1))

    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(namesUpper.join(' '));
  return namesUpper.join(' ');
};

capitalizeName('jessica ann smith davis');
capitalizeName('sonya nikolova');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Sonya'.padStart(25, '+').padEnd(30, '+'));

const maskCreditCard = number => {
  const str = number + ''; // String(number)
  // const originalLength = str.length
  // const paddedString = last4Digits.padStart(originalLength, 'X')

  const last4Digits = str.slice(-4);
  const paddedString = last4Digits.padStart(str.length, 'X');

  console.log({ paddedString });
  return paddedString;
};

maskCreditCard(111111);
maskCreditCard(8284739480242);
maskCreditCard('383957578458020342');

// Replace
const message2 = 'Bad weather... All Departures Delayed... '
console.log(message2.repeat(5))

const planesInLine = (n) => {
  console.log(`There are ${n} planes in line ${'🛩️'.repeat(n)}`)
}
planesInLine(5)
planesInLine(13)