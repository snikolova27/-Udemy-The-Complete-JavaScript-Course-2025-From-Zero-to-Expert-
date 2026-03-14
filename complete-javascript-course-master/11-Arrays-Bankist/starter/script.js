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
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

generateUsernamesInPlace(accounts);

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

const displayMovements = (movements, sort = false) => {
  // Empty entire movements container
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((move, idx) => {
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
function generateUsername(user) {
  return user
    .toLowerCase()
    .split(' ')
    .map(word => word[0])
    .join('');
}

const generateUsernamesForAccounts = accounts => {
  return accounts.map(account => {
    return { ...account, username: generateUsername(account.owner) };
  });
};

function generateUsernamesInPlace(accounts) {
  accounts.forEach(account => {
    account.username = generateUsername(account.owner);
  });
}

const calculateAndDisplayBalance = account => {
  const balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
  account.balance = balance;
};

const calculateAndDisplaySummary = account => {
  const deposits = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const withdrawals = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = `${deposits}`;
  labelSumOut.textContent = `${Math.abs(withdrawals)}`;
  labelSumInterest.textContent = `${interest}`;
};

const displayAccountInformation = account => {
  displayMovements(account.movements);
  calculateAndDisplayBalance(account);
  calculateAndDisplaySummary(account);
};

const handleLogout = () => {
  currentAccount = undefined;
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to continue';
};

let currentAccount;

const handleLogin = event => {
  // Prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    acc =>
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value),
  );

  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`;
    containerApp.style.opacity = 1;
    displayAccountInformation(currentAccount);
  } else {
    handleLogout();
  }

  // Clear input fields for login
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();
};

const handleTransfer = e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiver.username !== currentAccount.username
  ) {
    // Add a negative transaction to current account
    currentAccount.movements.push(-amount);

    receiver.movements.push(amount);
    displayAccountInformation(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
};

const handleCloseAccount = e => {
  e.preventDefault();

  const clear = () => {
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
    inputCloseUsername.blur();
  };

  if (!currentAccount) {
    return;
  }

  if (
    currentAccount.username !== inputCloseUsername.value ||
    currentAccount.pin !== Number(inputClosePin.value)
  ) {
    clear();
    return;
  }

  clear();

  const idxOfCurrentAccount = accounts.findIndex(
    acc =>
      acc.username === currentAccount.username &&
      acc.pin === currentAccount.pin,
  );

  if (idxOfCurrentAccount >= 0) {
    accounts.splice(idxOfCurrentAccount, 1);
    handleLogout();
  }
};

const handleLoan = e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    displayAccountInformation(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
};

let areMovementsSorted = false;
const handleSortMovements = e => {
  e.preventDefault();

  displayMovements(currentAccount.movements, !areMovementsSorted);
  areMovementsSorted = !areMovementsSorted;
};

btnLogin.addEventListener('click', handleLogin);
btnTransfer.addEventListener('click', handleTransfer);
btnClose.addEventListener('click', handleCloseAccount);
btnLoan.addEventListener('click', handleLoan);
btnSort.addEventListener('click', handleSortMovements);

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

const firstWithdrawal = movements.find(mov => mov < 0);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');

const lastWithdrawal = movements.findLast(mov => mov < 0);
const lastLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000,
);
console.log(
  `Your latest large movement (> 1000) was ${movements.length - lastLargeMovementIndex - 1} movements ago`,
);

movements.some(mov => mov > 0);
movements.every(mov => mov > 100);

const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [[4], 5, 6], 7, 8, 9];
console.log(arrDeep.flat());
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
const allMovements = accountMovements.flat();
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// sort sorts after converting to string and then sorts alphabetically
//console.log(movements.sort())

console.log(movements);
// Ascending
// return < 0, a,b
// return > 0, b,a

// movements.sort((a, b) => {
//   if(a > b) return 1
//   if(b > a) return -1
// });

movements.sort((a, b) => a - b);

console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });

movements.sort((a, b) => b - a);
console.log(movements);

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

// ==== Array grouping ====
const groupMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposits' : 'withdrawals',
);
console.log({ groupMovements });

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) return 'very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});

console.log({ groupedByActivity });

// const groupedByType = Object.groupBy(accounts, account => account.type)
const groupedByType = Object.groupBy(accounts, ({ type }) => type);

console.log(groupedByType);

// ==== Filling arrays ====
const x = new Array(7);
console.log(x); /// empty array with length 7
// x.fill(1)
x.fill(1, 3);
x.fill(2, 0, 3);
console.log(x);

arr.fill(23, 2, 6);

// Array.from
const y = Array.from(
  {
    length: 7,
  },
  () => 1,
);

console.log(y);

const z = Array.from({ length: 7 }, (_, idx) => idx + 1);
console.log(z);

labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')),
  );

  console.log({ movementsUI });

  const movementsUi2 = [...document.querySelectorAll('.movements__value')].map(
    el => Number(el.textContent.replace('€', '')),
  );

  console.log({ movementsUI2 });
});

// Destructive array methods
const reversed = movements.slice().reverse();
const reversed2 = movements.toReversed();

// toSpliced(splice), toSorted(sort)

// movements[1] = 2000
const newMovements = movements.with(1, 2000);
console.log({ newMovements });
console.log({ movements });

// === Array practice ====
const totalDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, curr) => acc + curr, 0);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

const numDeposits1000WithReduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => (acc += curr >= 1000 ? 1 : 0), 0);

console.log({ numDeposits1000 });
console.log({ numDeposits1000WithReduce });

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
      sums[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
      return sums;
    },

    {
      deposits: 0,
      withdrawals: 0,
    },
  );

console.log({ sums });

// This is a nice title => This Is a Nice Title
const convertToTitleCase = title => {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'in', 'on', 'with'];

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  return capitalize(
    title
      .toLowerCase()
      .split(' ')
      .map(word => {
        if (exceptions.includes(word)) {
          return word;
        } else {
          return capitalize(word);
        }
      })
      .join(' '),
  );
};

console.log(convertToTitleCase('This is a nice title'));
console.log(convertToTitleCase('This is a LONG title but not too long'));
console.log(convertToTitleCase('and here is another title with an EXAMPLE'));
