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
  movements: [10000, 700, 50, -900, 7000, 160400, -790, -300],
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

const display = function (movement, sort = false) {
  // clearing the html default or already written text 👇🏽
  containerMovements.innerHTML = ``; // this how it is done👈🏼
  // the .textContent only returns the contents its self
  //  while the innerHTML return very thing including the html and also read Data
  const mov = sort ? movement.slice().sort((a, b) => a - b) : movement;
  mov.forEach(function (mov, i) {
    const state = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${state}">${
      i + 1
    } ${state}</div>
        <div class="movements__value">${mov}€</div>
      </div>
      `;
    // inset the code into the html using this 👇🏽
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};

// Computing user Name
const user = `Johnnie Modebe Chukwudi`.toLowerCase().split(` `);
// console.log(user);
const userName = user.map(us => us.slice(0, 1));

// console.log(userName);
const calPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// 👆🏽 this on a function

// TOPIC power of chaining
const createUserName = function (acct) {
  console.log(acct.length);
  acct.forEach(function (acc) {
    const { owner } = acc;
    acc.userName = owner
      .toLowerCase()
      .split(` `)
      .map(us => us[0])
      .join(``);
  });
};
createUserName(accounts);

const calDisplayBalance = function (acc) {
  console.log(acc);
  const depositSummary = acc.movements
    .filter(money => money > 0)
    .reduce((acc, money) => acc + money, 0);
  labelSumIn.textContent = `${depositSummary}€`;
  // console.log(acc);
  const creditsSummary = acc.movements
    .filter(money => money < 0)
    .reduce((acc, money) => acc + money, 0);
  labelSumOut.textContent = `${Math.abs(creditsSummary)}€`;

  const interest = acc.movements
    .filter(money => money > 0)
    .map(money => Math.trunc((money * acc.interestRate) / 100))
    .filter(interest => interest > 1)
    .reduce((acc, money, i, arr) => acc + money, 0);
  labelSumInterest.textContent = `${interest}€`;
  // console.log(interest, acc.movements);
};

/*
const createUserName = function (userName) {
  return userName
    .toLowerCase()
    .split(` `)
    .map(us => us[0])
    .join(``);
};
*/
// console.log(accounts);
const updateUI = function (currentAccount) {
  //Display balance
  console.log(currentAccount);
  calPrintBalance(currentAccount);
  console.log(currentAccount);
  //Display movements
  display(currentAccount.movements);
  // Display summary
  calDisplayBalance(currentAccount);
};

//Event Handler
let currentAccount;
btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc, i, arr) => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    // or currentAccount?.pin === Number(inputLoginPin.value)
    // LOGIN IN AND PIN
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();
    // Display UI and a Welcome message
    labelWelcome.textContent = `welcome back ${
      currentAccount.owner.split(` `)[0]
    }`;
    containerApp.style.opacity = 100;
  }
  updateUI(currentAccount);
});

//TOPIC implementing transfers

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amountTransferred = Number(inputTransferAmount.value);
  const receiverAcct = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  console.log(amountTransferred, receiverAcct?.userName, receiverAcct);
  inputTransferAmount.value = inputTransferTo.value = ``;

  if (receiverAcct) console.log(receiverAcct);
  else alert(`user does not exist`);

  if (
    amountTransferred > 0 &&
    receiverAcct &&
    currentAccount.balance >= amountTransferred &&
    receiverAcct?.userName !== currentAccount.userName
  ) {
    // console.log(`login`);
    currentAccount.movements.push(-amountTransferred);
    receiverAcct.movements.push(amountTransferred);
    updateUI(currentAccount);
  }
});
// TOPIC some() Method
// Request a loan
// the Bank only Grant a loan to an individual a deposit of at least
// 10% of the requested loan amount
btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  console.log(amount);
  // checking if the user has done any transaction that >= 75%
  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov >= amount * 0.75)
  ) {
    // proceed loan
    currentAccount.movements.push(amount);
    // update ui
    updateUI(currentAccount);
  }
  inputLoanAmount.value = ``;
});

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  // console.log(currentAccount.userName);
  if (
    currentAccount[userName] === inputCloseUsername.value &&
    currentAccount[pin] === Number(inputClosePin.value)
  ) {
    // console.log(`logout`);
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(index);
    // DELETE THE ACCOUNT
    // accounts.splice(index, 1);
    accounts.splice(index, 1);
    // HIDE USER INTERFACE
    containerApp.style.opacity = 0;
    console.log(accounts);
  }
  inputCloseUsername.value = inputClosePin.value = ``;
});

let sorted = false;
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  s;
  display(currentAccount.movements, !sorted);
  sorted = !sorted;
  // console.log(currentAccount.movements);
});
//////////////////////////
///////////////////////
/////////////////////////////////////////////////
// LEC

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
// arr.splice(2); //  [`c`, `b`, `e`] delete or mutate
// arr.splice(-1); // [`b `]
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
  // console.log(map);
});

// On Sets
const uniqueCurrencies = new Set([`USD`, `NGA`, `USD`, `EUR`, `PUN`, `NGA`]);
uniqueCurrencies.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
  // console.log(set);// set{`USD`, `NGA`, `USD`, `EUR`, `PUN`, `NGA`}
});
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/*
Coding CHALLENGE #1
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
  const realDogs = [...dogsJulia.slice(1, -1), ...dogsKate];
  console.log(realDogs);
  realDogs.forEach(function (dog, i) {
    const age = dog > 3 ? `an Adult` : `a Puppy`;
    console.log(`Dog number ${i + 1} is ${age}, and is ${dog} years old`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
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

const storeMap = euros.map(
  (mov, i, arr) =>
    `Move ${i + 1}: You ${mov > 0 ? `deposited` : `You withdraw`} ${Math.abs(
      mov
    )}`
);
// console.log(storeMap);
// console.log(typeof []); // `object`

// TOPIC FILTER
const deposits = euros.filter(mon => mon > 100);
// console.log(deposits);// [200, 450, 3000, 1300]

//👇🏽 Using the (For of) to do the same thing
const depositsFor = [];
for (const euro of euros) {
  if (euro > 100) depositsFor.push(euro);
}
console.log(depositsFor); // [200, 450, 3000, 1300]
// arrays of withdrawals
const withdrawals = euros.filter(mon => mon < 0);
// console.log(withdrawals);

// TOPIC Reduce Methods
//[N/B] The first parameter in the reduce method is the Accumulator
// the last element separated by a comma is the initial value of the accumulator
// N/B THE REDUCE METHOD DOES NOT RETURN A NEW ARRAY AND TAKE TWO PARAMETERS
// THE ACCUMULATOR, CURRENT VALUE, INDEX, ARRAY AND THE INITIAL VALUE OF THE ACCUMULATOR
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
  console.log(filter);
  const mapOutDog = arrayOfAge.map(
    (adult, i) => adult >= 18 && `dog ${i + 1} is ${adult}`
  );
  console.log(mapOutDog);
  const reducers = filter.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return Math.floor(reducers);
};
const avg1 = calcAverageHumanAgeAndAvg([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAgeAndAvg([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

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
/*
CHALLENGE 3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
 */
const calcAverageHumanAge = age =>
  age
    .map((age, i, arr) => (age >= 2 ? 16 + age * 4 : age ** 2))
    .filter((age, i, arr) => age > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const tAVg = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const tAVg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(tAVg, tAVg2);

// TOPIC THE FIND METHOD
// THE FIND METHOD IS USED TO FIND A SINGLE ELEMENT IN AN ARRAY
//THAT MEETS A CERTAIN CONDITION AND RETURNS THE FIRST ELEMENT
//THAT MEETS THE CONDITION AND NOT THE WHOLE ARRAY LIKE THE FILTER METHOD
//BUT SIMILAR TO THE SOME METHOD

/**
TABLE OF DIFFERENCE BETWEEN THE FIND AND THE FILTER METHOD
              FIND METHOD  |  FILTER METHOD

 RETURNS THE FIRST ELEMENT THAT MEETS THE CONDITION - 
 | - RETURNS THE WHOLE ARRAY THAT MEETS THE CONDITION
 RETURNS THE ELEMENT ITSELF - | - RETURNS THE CONDITION
 RETURNS THE INDEX OF THE ELEMENT - | 
- RETURNS THE INDEX OF THE ELEMENT IN THE ARRAY THAT MEETS THE CONDITION
 RETURNS THE ARRAY ITEM - | - RETURNS THE ARRAY ITSELF (THE WHOLE ARRAY)
 */

const allWithDrawal = [-20, -200, -399, 200, 300];
const firstWithdrawal = allWithDrawal.find(mov => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find(
  acc => acc?.userName === `jmc` || acc.userName?.startsWith('j')
);
// console.log(account); // {…}
// CHALLENGE Doing the same thing with the (For loop)
// THIS MY OWN VERSION OF THE FIND METHOD USING THE FOR LOOP
let accOwner;
for (const account of accounts) {
  if (account?.userName?.endsWith(`mc`)) {
    accOwner = account;
  }
}

// console.log(accOwner);
// TOPIC THE SOME METHOD
// THE SOME METHOD IS USED TO CHECK IF THERE IS ANY ELEMENT IN THE ARRAY
// THAT MEETS A CERTAIN CONDITION AND RETURNS A BOOLEAN
// console.log(account);
const anyDeposits = allWithDrawal.some(mov => mov > 0);
// console.log(anyDeposits); //true

// TOPIC The every Method
// the every method is similar to the some method
//
//  console.log(movements.every(mov => mov > 0)); // false
//  console.log(account4.movements.every(mov => mov > 0));// true

// creating a separate callback
const deposit = mov => mov < 0;
movements.some(deposit);
movements.every(deposit);
movements.filter(deposit);

// TOPIC FLAT AND FLATMAP
const arrFlat = [1, 2, 3, [1, 2, 3], 4, 5, [6, 7]];
arrFlat.flat();
const arrFlatDeep = [[1, [2, 3]], 4, 5, [6, [7, [8, [9, 10]]]]];
arrFlatDeep.flat(); // 1, (2) […], 4, 5, 6, (2) […] ]
// arrFlatDeep.flat(2); // [ 1, 2, 3, 4, 5, 6, 7, (3) […] ]
arrFlatDeep.flat(3); //  [ 1, 2, 3, 4, 5, 6, 7, 8, [9, 10] ]
arrFlatDeep.flat(4); //  [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log(arrFlatDeep.flat(Infinity)); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
// THE FLAT METHOD CAN BE USED TO FLATTEN AN ARRAY OF ARRAY
// THE INFINITY IS USED TO FLATTEN AN ARRAY OF ANY DEPTH
// FLATMAP METHOD IS USED TO FLATTEN AN
// ARRAY OF ARRAY AND ALSO MAP OVER IT FOR EXAMPLE
const accountMovements = accounts.map(acc => acc.movements).flat(Infinity);
// console.log(accountMovements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300, … ]

// Real life  use case of the flat method
const bankTransactionSum = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
// console.log(bankTransactionSum);

// TOPIC Sorting
/**
 * 
`sort()` method is used to sort arrays in JavaScript.
 It arranges the elements in ascending order by default,
but when sorting numbers, it treats them as strings,
 which can lead to unexpected results.
 * @johnniedom 
 * for more explanation on the
 * sort method check this file below
 * @file {sortMethod.md}  - This file contains a sorting method explanation.
* @link {sortMethod.md } 
* 

*/
// The sort method does the sorting based on string
// On Strings
const owners = [`Jonas`, `Zach`, `Adam`, `Obi`];
owners.sort(); // [ "Adam", "Jonas", "Obi", "Zach" ]
// console.log(owners); // [ "Adam", "Jonas", "Obi", "Zach"]

//On Numbers

const num = [200, 450, -400, 3000, -650, -130, 70, 1300, 34, 35];
num.sort((a, b) => {
  console.log(a - b);
  console.log(b - a);
  console.log(a);
  console.log(b);

  a - b;
}); // [-130, -400, -650, 1300, 200, 3000, 450, 70 ]
// num.sort(); // [-130, -400, -650, 1300, 200, 3000, 450, 70 ]
console.log(num); // [-130, -400, -650, 1300, 200, 3000, 450, 70 ]

// [N/B] In sorting (positive & negative values has there functions)
// When Positive      (switch Position)
// when Negative or 0 (Keep Position)
// (200 - 450); // -250 (negative) this will switch position
// (450 - 200); // 250 (positive) this will keep position
// (200 - 200); // 0 (zero) this will keep position
// (200 - -200); // 400 (positive) this will switch position

// Using this theory we have that 👇🏽
// assuming that a & b are consecutive Numbers
// if [b,a](a) is grater than (b) then (a-b) is something positive = [a,b] (switch order)
// if (a) is less than (b) then (b - a ) is something negative = [a,b] (keep order)
// if (a) is equal to (b) then (a - b) or (b - a) is zero = [a,b] (keep order)

// return > 0, A,B (switch order(when grater than 1))
// return <= 0, B,A (keep order(when returned less than 0))

// Ascending  for numbers (a-b)
// num.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

//👆🏽 Improved and better code
// num.sort((a, b) => a - b);
//  [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
console.log(num); // [ -650, -400, -130, 70, 200, 450, 1300, 3000 ]

//Descending order
// num.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
//N.B THE SORT METHOD MUTATE THE ORIGINAL ARRAY
num.sort((a, b) => b - a);
// console.log(num); // [ 3000, 1300, 450, 200, 70, -130, -400, -650 ]

// TOPIC CRATE ARRAY AND FILL ARRAY

//  THE NEW ARRAY METHOD IS USED TO CREATE A NEW ARRAY
// E.G (new Array(7)) will create an array of 7 empty elements

const x = new Array(7);
console.log(x);

// HOW THE FILL METHOD WORKS AFTER CREATING AN ARRAY
//  THE FILL METHOD IS USED TO FILL AN ARRAY WITH A CERTAIN VALUE
// THE FIRST ARGUMENT IS THE VALUE TO BE FILLED
// THEN THE SECOND ARGUMENT IS THE STARTING POINT
// AND THE THIRD ARGUMENT IS THE ENDING POINT
// THE ENDING POINT IS NOT INCLUDED IN THE FILL METHOD
// THAT IS WHY IT IS CALLED A HALF OPEN INTERVAL
// THE FILL METHOD MUTATE THE ORIGINAL ARRAY
// const fill = x.fill(3);
// console.log(fill); // [ 3, 3, 3, 3, 3, 3, 3 ]

const fillSet = x.fill(2, 0, -1);
console.log(fillSet); // [ 2, 2, 2, 2, 2, 2, 2 ]

// THE FROM METHOD IS USED TO CREATE AN ARRAY FROM AN ITERABLE
// IT CAN ALSO TAKE A MAP FUNCTION
// IT CAN ALSO TAKE A SECOND ARGUMENT THAT IS A MAP FUNCTION
// IT CAN ALSO TAKE A THIRD ARGUMENT THAT IS A THIS KEYWORD
// EXAMPLE WERE three PARAMETERS ARE USED
const exeObj = {
  name: `Johnnie`,
  age: 23,
  job: `Software Engineer`,
  present: function (par) {
    console.log(`Hello ${par}, my name is ${this.name}`);
  },
};
// HOW TO USE THE THIS KEYWORD IN THE FROM METHOD
// THE THIS KEYWORD IS USED TO REFER TO THE OBJECT
// HERE THE THIS KEYWORD IS USED TO REFER TO THE exeObj OBJECT
// TO USE THE THIS KEYWORD IN THE FROM METHOD
// YOU HAVE TO PASS THE OBJECT AS THE THIRD ARGUMENT
// AND THEN THE THIS KEYWORD WILL REFER TO THE OBJECT
// USING THE THIS KEYWORD IN THE FROM METHOD IS OPTIONAL
// TO ACCESS THE THIS KEYWORD IN THE FROM METHOD YOU HAVE TO USE THE
// ARROW FUNCTION FOR EXAMPLE :
const fromCopilot = Array.from(
  { length: 2 },
  function (el, i, arr) {
    console.log(
      `Hello, my name is ${this.name} and i am ${this.age + i}  years old`
    );
  },
  exeObj
);
// Underscore is used to present array parameter that will not be needed
const from = Array.from({ length: 30 }, (_, i) => i + 1);
// console.log(from);// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, … ]

const randomDice = Array.from({ length: 100 }, (value, i) =>
  Math.floor(Math.trunc(Math.random(value) * 6 + 1))
);
console.log(randomDice);

// Array.from(); can be use to convert iterables to arrays
// and also the a NodeList to array e.g (querySelectorAll)
labelBalance.addEventListener(`click`, function () {
  const movementsUI = Array.from(
    document.querySelectorAll(`.movements__value`), // First argument
    el => Number(el.textContent.replace(`€`, ``)) // Function / second argument
  );

  //  console.log(movementsUI.map(el =>  Number(el.textContent.replace(`€`, ``))));
  console.log(movementsUI);
});

/*
Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%,
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Formula: 
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)
Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
Test data:
const dogs = [
{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
{ weight: 8, curFood: 200, owners: ['Matilda'] },
{ weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
{ weight: 32, curFood: 340, owners: ['Michael'] },
];
GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  { weight: 32, curFood: 376, owners: ['Johnnie'] },
];
let recommendedFood;
let recommended;
// SOLUTION 1
//1, The array Method needed will only perform an action and not return a value
//2. create add the
console.log();
dogs.forEach(function (el) {
  el.recommendedFood = `${Number(Math.trunc(el.weight ** 0.75 * 28))}kg`;
  // console.log( );
  // SOLUTION 2
  // 1. this will need a boolean in order to to confirm the owner is Sarah
  // 2.
  // const finder = dogs.find(el => el.owners.flat() === 'Sarah`
  // const finder = dogs.owners.include('Sarah')
  // dogs.includes
  if (el.owners.includes('Sarah')) {
    let recommended = Number(el.recommendedFood.replace(`kg`, ''));
    const determiner =
      el.curFood > recommended ? `is eating too much` : `is eating too Little`;
    console.log(`${el.owners[0]}'s dog ${determiner}`);
  }
});
//SOLUTION 3
// 1. filter the calculated eating
//-for little and eat large in diff.arrays
// 2. Map out the array object
//  const rcFood = Number(el.recommendedFood.replace(`kg`, ''));
//  const little = el.curFood > rcFood * 0.9 && el.curFood < rcFood * 1.1;
//   const ownersEatTooMuch =el.map(el=> el === little)
//   console.log(ownersEatTooMuch);
const ownersEatTooMuch = dogs.filter(
  el => el.curFood > Number(el.recommendedFood.replace(`kg`, ''))
);
console.log(ownersEatTooMuch);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs.filter(
  el => el.curFood < Number(el.recommendedFood.replace(`kg`, ''))
);
const normal = dogs.filter(
  el => el.curFood === Number(el.recommendedFood.replace(`kg`, ''))
);
console.log(ownersEatTooMuch, ownersEatTooLittle);

// SOLUTION 4
const state = ownersEatTooLittle ? `dogs eat too much!` : null;
const logger = function (obj) {
  obj.forEach(el => {
    const statement =
      el.curFood > Number(el.recommendedFood.replace(`kg`, ''))
        ? `Eat Too Much`
        : `Eat Too Little`;
    // console.log(el.owners.join(` , `).replace(`,`, `and`));
    const stringPrint = `${el.owners
      .join(` , `)
      .replace(`,`, `and`)} dogs ${statement}`;
    // console.log(stringPrint);
  });

  //SOLUTION 5
  // if(obj ){
  //   // console.log(`Hello`);
  // }else{
  //   // console.log(`Nope`);
  // }
};

logger(ownersEatTooMuch);
logger(ownersEatTooLittle);
logger(normal);

// console.log(dogs);

const sameAmount = dogs.some(
  el => el.curFood === Number(el.recommendedFood.replace(`kg`, ''))
)
  ? true
  : false;
// console.log(sameAmount);

// SOLUTION 6
const anyAmount = el =>
  el.curFood > Number(el.recommendedFood.replace(`kg`, '')) * 0.9 &&
  el.curFood < Number(el.recommendedFood.replace(`kg`, '')) * 1.1;
const okayAmount = dogs.some(anyAmount);
console.log(okayAmount);
// console.log();

// SOLUTION 7
const arrFilter = dogs.filter(anyAmount).map(el => el);

// console.log(arrFilter);
// SOLUTION 8
/*
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)
*/
let copyRp;
const newDogs = dogs.slice();

newDogs.sort((a, b) => {
  if (
    a.recommendedFood.replace(`kg`, '') - b.recommendedFood.replace(`kg`, '')
  ) {
    return 1;
  }
});

// console.log(newDogs);
