'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = movements => {
  // Empty entire movements container
  containerMovements.innerHTML = '';

  movements.forEach((move, idx) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${idx + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${move}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// const user = 'Steven Thomas Williams' // stw
const generateUsername = user => {
  return user
    .toLowerCase()
    .split(' ')
    .map(word => word[0])
    .join('');
};

const generateUsernamesForAccounts = accounts => {
  return accounts.map(account => {
    return { ...account, username: generateUsername(account.owner) };
  });
};

const generateUsernamesInPlace = accounts => {
  accounts.forEach(account => {
    account.username = generateUsername(account.owner);
  });
};

const calculateAndDisplayBalance = movements => {
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
};

const calculateAndDisplaySummary = movements => {
  const deposits = movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const withdrawals = movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = `${deposits}`;
  labelSumOut.textContent = `${Math.abs(withdrawals)}`;
  labelSumInterest.textContent = `${interest}`;
};

displayMovement(account1.movements);
generateUsernamesInPlace(accounts);
calculateAndDisplayBalance(account1.movements);
calculateAndDisplaySummary(account1.movements);

const depositsForAccount1 = account1.movements.filter(mov => mov > 0);
const withdrawalsForAccount1 = account1.movements.filter(mov => mov < 0);
const balanceAccount1 = account1.movements.reduce(
  (acc, current) => acc + current,
  0,
);

// Get max value with reduce
const maxValue = account1.movements.reduce(
  (acc, curr) => (acc = curr > acc ? curr : acc),
  account1.movements[0],
);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;

const eurosToUsdArr = movements.map(mov => mov * euroToUsd);

const movementsDescriptions = movements.map((move, idx, arr) => {
  return (
    `Movement ${idx + 1}: ` +
    `You ${move > 0 ? 'deposited 🏧💰' : 'withdrew 🤑'} ${Math.abs(move)}`
  );
});

console.log({ movementsDescriptions });

// PIPELINE
const totalDeposits = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, curr) => acc + curr, 0);
console.log({ totalDeposits });

/////////////////////////////////////////////////

// ==== ARRAY METHODS =====
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE = returns new array
console.log(arr.slice(2));
// End index is not included in result
console.log(arr.slice(2, 4));

// Gets last two elements
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// Create a shallow copy of array
console.log(arr.slice());
console.log(...arr);

// SPLICE - deletes parts of the original array
// console.log(arr.splice(2))
console.log(arr.splice(-1));
// Deleting exactly 2 elements starting from position 1
console.log(arr.splice(1, 2));
console.log(arr);


// REVERSE - mutates original array
 arr = ['a', 'b', 'c', 'd', 'e'];
 const arr2 = ['j', 'i', 'h', 'g', 'f']
 console.log(arr2.reverse())
 console.log(arr2)

 // CONCAT
 const letters = arr.concat(arr2)
 console.log(letters)
 // Same as
 console.log([...arr, ...arr2])

 // JOIN
 console.log(letters.join (' - '))

*/

// ==== AT METHOD =====

/*
const arr = [23, 11, 64];
console.log(arr[0])
console.log(arr.at(0))

// Get the last element of the array
console.log(arr[arr.length - 1])
console.log(arr.slice(-1)[0])
console.log(arr.at(-1))

console.log('jonas'.at(0))
console.log('jonas'.at(-1))
*/

// ==== FOR EACH METHOD =====

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const move of movements) {
for (const [idx, move] of movements.entries()) {
  console.log(
    `Movement ${idx + 1}: ` +
      `You ${move > 0 ? 'deposited 🏧💰' : 'withdrew 🤑'} ${Math.abs(move)}`,
  );
}

console.log('====== FOR EACH ======');
movements.forEach((move, index) => {
  console.log(
    `Movement ${index + 1}: ` +
      `You ${move > 0 ? 'deposited 🏧💰' : 'withdrew  🤑'} ${Math.abs(move)}`,
  );
});
*/

// ==== FOR EACH METHOD WITH MAPS AND SETS =====

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key,map) => {
  console.log(`${key}: ${value}`)
})

const currenciesUnique = new Set(['USD', 'USD', 'EU', 'GBP'])
currenciesUnique.forEach((value, key, map) => {
  console.log(`${key}: ${value}`) // USD: USD
})

currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${value}`) // USD: USD
})

*/
