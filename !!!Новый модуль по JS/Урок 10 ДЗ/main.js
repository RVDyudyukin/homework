//Task 1

const firstName = 'Roman';
const lastName = 'Dyudyukin';
const isStudent = true;

console.log(firstName, lastName, isStudent);

//Task 2

let age = 29;
let currentYear = 2026;
let birthYear = currentYear - age;

console.log(birthYear);


//Task 3

console.log('Меня зовут ' + [firstName] + ' ' + [lastName] +', мне ' + [age] + ' лет. Я ученик курса: ' + [isStudent] + '.');

//Task 4

let a = '123';
let b = +'456';
let c = Number('789');
let d = Boolean(0);
let e = Boolean(' ');
let result = a + b + c + d + e;

console.log(result) //123456789falseTrue

