'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANK APP

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
const account5 = {
  owner: 'Johnnie Modebe Chukwudi',
  movements: [430, 1000, 700, 50, 90, 5000, 3400, 1150, -790],
  interestRate: 1.5,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

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

const display = function (movement) {
  // clearing the html default or already written text 👇🏽
  containerMovements.innerHTML = ``; // this how it is done👈🏼
  // the .textContent only returns the contents its self
  //  while the innerHTML return very thing including the html and also read Data
  movement.forEach(function (mov, i) {
    const state = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${state}">${
      i + 1
    } ${state}</div>
        <div class="movements__value">${mov}</div>
      </div>
      `;
    // inset the code into the html using this 👇🏽
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};
display(account1.movements);

// Computing user Name
const user = `Johnnie Modebe Chukwudi`.toLowerCase().split(` `);
// console.log(user);
const userName = user.map(us => us.slice(0, 1));
// console.log(userName);
const calPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = balance;
};

// 👆🏽 this on a function
const createUserName = function (acct) {
  acct.forEach(function (acc) {
    // console.log(acc.owner);
    acc.userName = acc.owner
      .toLowerCase()
      .split(` `)
      .map(us => us[0])
      .join(``);
  });
};
createUserName(accounts);
calPrintBalance(account1.movements);

// TOPIC power of chaining
const calDisplayBalance = function (movements) {
  const depositSummary = movements
    .filter(money => money > 0)
    .reduce((acc, money) => acc + money, 0);
  labelSumIn.textContent = `${depositSummary}💲`;

  const creditsSummary = movements
    .filter(money => money < 0)
    .reduce((acc, money) => acc + money, 0);
    labelSumOut.textContent = `${Math.abs(creditsSummary)}💲`;
};
calDisplayBalance(account1.movements);

// console.log(createUserName(accounts));
/*
const createUserName = function (userName) {
  return userName
    .toLowerCase()
    .split(` `)
    .map(us => us[0])
    .join(``);
};*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Simple Test array
// slice
let arr = [`a`, `b`, `c`, `b`, `e`];
// using  a method on arr
arr.slice(2); // this will return new copy of arr  [`c`, `b`, `e`]
arr.slice(2, 4); // this will return new copy of arr  [`c`, `b`]

// Splice method
// it is similar to slice method but the fundamental diff. is that it mutate
//the original array
arr.splice(2); //  [`c`, `b`, `e`] delete or mutate
arr.splice(-1); // [`b `]
arr; // [`a`, `b`] it  changes the original array
// it can take two of arguments like the Slice
// where first where to start from and No. of items to del e.g 👇🏽
arr.splice(1, 3); // [ "b", "c", "b" ]
arr; // [ "a", "e" ]

// Revers
arr = [`a`, `b`, `c`, `b`, `e`];
let arr2 = ['j', 'i', 'h', 'g', 'f'];
arr2.reverse();
// The Revers method does actually mutate the original array
arr2; //  [ `f`, `g`, `h`, `i`, `j`]

// Concat methods (does not mutate)
let letter = arr.concat(arr2);
// or used the spread operator
letter = [...arr, ...arr2];

// Join
letter.join(`-`); // a-b-c-b-e-f-g-h-i-j

//  TOPIC looping arrays using the Foreach LOOP
// looping over array using Foreach method
// first using the For of loop
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for(const movement of movements){
//   if(movement > 0){
// const statement = movement > 0  ? `You deposited` : `You withdraw`;
//     console.log(statement, movement);
//   }else{
//  const statement = movement > 0  ? `You deposited` : `You withdraw`;
//     console.log(statement, Math.abs(movement) );
//   }
// }

// Now using the Foreach
// movements.forEach(function (movement) {
//   const statement = movement > 0 ? `You deposited` : `You withdraw`;
//   if (movement > 0) {
//     console.log(statement, movement);
//   } else {
//     console.log(statement, Math.abs(movement));
//   }
// });
// 👉🏽 getting the current index of The forEach method using 👆🏽 this code
movements.forEach(function (movement, index, arr) {
  const statement = movement > 0 ? `You deposited` : `You withdraw`;
  if (movement > 0) {
    // console.log(statement, movement, 'Number', index + 1);
  } else {
    // console.log(statement, Math.abs(movement), 'Number', index + 1);
    // console.log(`or even the array ${arr}`);
  }
});

// TOPIC EACH FOR MAPS AND SETS
// On Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  // console.log(`${key}: ${value}`);
});

// On Sets
const uniqueCurrencies = new Set([`USD`, `NGA`, `USD`, `EUR`, `PUN`, `NGA`]);
uniqueCurrencies.forEach(function (value, key, set) {
  // console.log(`${key}: ${value}`);
});
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/*
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶
")
4. Run the function for both test datasets
Test data:nwe
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉
GOOD LUCK 😀
 */
// SOLUTION
const checkDogs = function (dogsJulia, dogsKate) {
  const realDogs = [...dogsJulia.slice(1, -2), ...dogsKate];
  console.log(realDogs);
  realDogs.forEach(function (dog, i) {
    const age = dog > 3 ? `an Adult` : `a Puppy`;
    console.log(`Dog number ${i + 1} is ${age}, and is ${dog} years old`);
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3],  [10, 5, 6, 1, 4]);

// TOPIC DATA TRANSFORMATION
// (MAP, FILTER, REDUCE)
//👉🏽 MAP
// they can also be used to loop over array just like for
// but they return a new array after the iteration

const euros = [200, 450, -400, 3000, -650, -130, 70, 1300];
// using the Method example
const rate = 1.6;
const eurToUsd = euros.map(function (usd, i) {
  const converter = usd * rate;
  return converter;
});
// console.log(eurToUsd);

// small CHALLENGE 😂 (TURN THIS 👆🏽 TO ARROW FUNCTION).
const euroToUSD = euros.map(euro => euro * rate);
// console.log(euroToUSD);

const alert = euros.map(
  (mov, i, arr) =>
    `Move ${i + 1}: You ${mov > 0 ? `deposited` : `You withdraw`} ${Math.abs(
      mov
    )}`
);

// console.log(...alert);
// TOPIC FILTER
const deposits = euros.filter(mon => mon > 0);
// console.log(deposits);
// Using the (For of) to do the same thing
const depositsFor = [];
for (const euro of euros) {
  if (euro > 0) depositsFor.push(euro);
}
//  console.log(depositsFor);
// arrays of withdrawals
const withdrawals = euros.filter(mon => mon < 0);
// console.log(withdrawals);

// TOPIC Reduce Methods
//[N/B] The first parameter in the reduce method is the Accumulator
// the last element separated by a comma is the initial value of the accumulator
const balance = euros.reduce(function (acc, value, index, arrays) {
  return acc + value;
}, 0);
// console.log(balance);
// Highest max value of an array using the the Reduces method
const maxValue = euros.reduce((acc, euro) => (acc > euro ? acc : euro));
// console.log(maxValue);

/*
CHALLENGE #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/
const calcAverageHumanAgeAndAvg = ages => {
  const arrayOfAge = ages.map(function (age, i, arr) {
    if (age > 2) {
      // console.log(16 + age * 4);
      return 16 + age * 4;
    } else {
      // console.log(age ** 2);
      return age ** 2;
    }
  });
  const filter = arrayOfAge.filter(adult => adult >= 18);
  const reducers = filter.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return reducers;
};
const avg1 = calcAverageHumanAgeAndAvg([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAgeAndAvg([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// console.log(tester.length);

// TOPIC CHAINING OF METHODS
const tester = [5, 2, 4, 1, 15, 8, 3];
const testerTest = tester
  .map(function (test) {
    if (test > 2) {
      return 16 + test * 4;
    } else {
      return test ** 2;
    }
  })
  .filter(adult => adult > 18)
  .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// console.log(testerTest);
// console.log(tester.length);
