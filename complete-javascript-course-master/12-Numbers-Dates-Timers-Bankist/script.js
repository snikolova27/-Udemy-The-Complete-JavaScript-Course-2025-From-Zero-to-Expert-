"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Functions

generateUsernamesInPlace(accounts);

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatMovementDate = (date, account) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  const daysPassed = calcDaysPassed(Date.now(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed === 7) return "Week ago";

  return Intl.DateTimeFormat(account.locale).format(date);
};

const formatCurrency = (locale, currency, number) => {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(number);
};

const displayMovements = (account, sort = false) => {
  // Empty entire movements container
  containerMovements.innerHTML = "";
  const movementsWithDates = account.movements.map((mov, i) => {
    return { movement: mov, date: account.movementsDates[i] };
  });

  const movs = sort
    ? movementsWithDates.slice().sort((a, b) => a.movement - b.movement)
    : movementsWithDates;

  movs.forEach((move, idx) => {
    const type = move.movement > 0 ? "deposit" : "withdrawal";
    const date = new Date(move.date);

    const displayDate = formatMovementDate(date, account);
    const currencyFormatted = formatCurrency(
      account.locale,
      account.currency,
      move.movement.toFixed(2),
    );

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${idx + 1} ${type}</div>
           <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${currencyFormatted}</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// const user = 'Steven Thomas Williams' // stw
function generateUsername(user) {
  return user
    .toLowerCase()
    .split(" ")
    .map((word) => word[0])
    .join("");
}

const generateUsernamesForAccounts = (accounts) => {
  return accounts.map((account) => {
    return { ...account, username: generateUsername(account.owner) };
  });
};

function generateUsernamesInPlace(accounts) {
  accounts.forEach((account) => {
    account.username = generateUsername(account.owner);
  });
}

const calculateAndDisplayBalance = (account) => {
  const balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance.toFixed(2)}€`;
  account.balance = formatCurrency(account.locale, account.currency, balance);
};

const calculateAndDisplaySummary = (account) => {
  const deposits = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const withdrawals = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = `${formatCurrency(
    account.locale,
    account.currency,
    deposits.toFixed(2),
  )}`;

  labelSumOut.textContent = `${formatCurrency(
    account.locale,
    account.currency,
    Math.abs(withdrawals.toFixed(2)),
  )}`;
  labelSumInterest.textContent = `${formatCurrency(
    account.locale,
    account.currency,
    interest.toFixed(2),
  )}`;
};

const displayAccountInformation = (account) => {
  displayMovements(account);
  calculateAndDisplayBalance(account);
  calculateAndDisplaySummary(account);
};

const handleLogout = () => {
  currentAccount = undefined;
  containerApp.style.opacity = 0;
  labelWelcome.textContent = "Log in to continue";
};

let currentAccount, logoutTimer;

const startLogoutTimer = () => {
  // Set time to 5 minutes
  // Call the timer every second
  // In each call, print the timer on the screen
  // When timer reaches 0, logout user

  let time = 30;
  const tick = () => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${minutes}:${seconds}`;

    if (time === 0) {
      clearInterval(timer);
      handleLogout();
    }

    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const handleLogin = (event) => {
  // Prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(
    (acc) =>
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value),
  );

  if (currentAccount) {
    if (logoutTimer) {
      clearInterval(logoutTimer);
    }
    logoutTimer = startLogoutTimer();

    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}!`;
    containerApp.style.opacity = 1;
    displayAccountInformation(currentAccount);

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options,
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;
  } else {
    handleLogout();
  }

  // Clear input fields for login
  inputLoginPin.value = inputLoginUsername.value = "";
  inputLoginPin.blur();
  inputLoginUsername.blur();
};

const handleTransfer = (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(
    (acc) => acc.username === inputTransferTo.value,
  );

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiver.username !== currentAccount.username
  ) {
    // Add a negative transaction to current account
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    receiver.movements.push(amount);
    receiver.movementsDates.push(new Date().toISOString());
    displayAccountInformation(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  inputTransferTo.blur();

  // Reset timer
  clearInterval(logoutTimer);
  startLogoutTimer();
};

const handleCloseAccount = (e) => {
  e.preventDefault();

  const clear = () => {
    inputCloseUsername.value = inputClosePin.value = "";
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
    (acc) =>
      acc.username === currentAccount.username &&
      acc.pin === currentAccount.pin,
  );

  if (idxOfCurrentAccount >= 0) {
    accounts.splice(idxOfCurrentAccount, 1);
    handleLogout();
  }
};

const handleLoan = (e) => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      displayAccountInformation(currentAccount);
    }, 2500);
  }

  inputLoanAmount.value = "";
  inputLoanAmount.blur();
  // Reset timer
  clearInterval(logoutTimer);
  startLogoutTimer();
};

let areMovementsSorted = false;

const handleSortMovements = (e) => {
  e.preventDefault();

  displayMovements(currentAccount, !areMovementsSorted);
  areMovementsSorted = !areMovementsSorted;
};

// Fake always logged in
// currentAccount = account1;
// displayAccountInformation(currentAccount);
// containerApp.style.opacity = 1;

btnLogin.addEventListener("click", handleLogin);
btnTransfer.addEventListener("click", handleTransfer);
btnClose.addEventListener("click", handleCloseAccount);
btnLoan.addEventListener("click", handleLoan);
btnSort.addEventListener("click", handleSortMovements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// ===== Number parsing =====
console.log(Number.parseInt("30px")); // 30
console.log(Number.parseInt("e46")); // NAN
console.log(Number.parseInt("30px", 10));

console.log(Number.parseFloat("2.5 rem.  "));
console.log(Number.parseInt("2.5rem"));

console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20X"));
console.log(Number.isNaN(20 / 0));

// Best method to check if the value is a real number, not a string number
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20X"));
console.log(Number.isFinite(23 / 0));

// ==== Math operations ====
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, "23", 11, 2));
console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat("10px") ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

console.log(randomInt(10, 20));
console.log(randomInt(0, 3));

// Rounding integers
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor("23.9"));

console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.745).toFixed(2));
console.log(+(2.745).toFixed(2));

// Remainder operator
console.log(5 % 2);
console.log(5 / 2);

console.log(8 % 3);
console.log(8 / 3);

const isEven = (n) => n % 2 === 0;

labelBalance.addEventListener("click", () => {
  [...document.querySelectorAll(".movements__row")].forEach((row, idx) => {
    if (isEven(idx)) {
      row.style.backgroundColor = "#f7c3b0";
    }
    if (idx % 3 === 0) {
      row.style.backgroundColor = "#c8dffc";
    }
  });
});

*/

/*
// 287,460,000,000
// ===== Numeric separators ====
const diameter = 287_460_000_000;
const priceCents = 345_90;
console.log(priceCents);

const PI = 3.14_15;
console.log(Number("230000"));
console.log(Number("230_000")); // does not work -> NAN
console.log(parseInt("230_000")); // -> 230

// ===== Big int ====
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(33363737337388393966478382932);
console.log(33363737337388393966478382932n);
console.log(BigInt(334445));

// Operations
console.log(1000n - 1000n);
console.log(6364649319372n * 36363637392923n);

// console.log(Math.sqrt(16n)); -> does not work

const huge = 8383732730320320n;
const num = 23;
console.log(huge + BigInt(num));

// Exceptions of using big ints with ints
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n === 20n);

console.log(huge + " is REALLy BIG!!!");

// Division
console.log(10n / 3n);
console.log(10 / 3);
*/

/*
// === DATES ====

// Create a date
const now = new Date();
console.log(now);

console.log(new Date("Aug 02 2020 18:05:41"));
console.log(new Date("December 24, 2025"));
console.log(new Date(account1.movementsDates[0]));
// month is zero-based
console.log(new Date(2037, 10, 19, 25, 23, 5));
// JS autocorrects to 1s Dec
console.log(new Date(2037, 10, 31));

console.log(new Date(0))
// 3 days after Date 0
console.log(new Date(3 * 24 * 60 * 60 * 1000))

// working with dates
const future = new Date(2037, 10, 19)
console.log(future.getFullYear())
console.log(future.getMonth())
console.log(future.getDate())
// day of the week
console.log(future.getDay())
console.log(future.getHours())
console.log(future.getMinutes())
console.log(future.getSeconds())

console.log(future.toISOString())
console.log(future.getTime()) // gets timestamp

// get the current timestamp
console.log(Date.now())

future.setFullYear(2040)
console.log(future)

const calcDaysPassed = (date1, date2) => Math.abs((date2-date1) / (1000 * 60 * 60 * 24))

*/
