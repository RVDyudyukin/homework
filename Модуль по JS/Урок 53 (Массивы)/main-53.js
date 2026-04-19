// Задание 1.
// Дан массив пользователей:
const users = [
    { name: 'Alex', age: 24, isAdmin: false },
    { name: 'Bob', age: 13, isAdmin: false },
    { name: 'John', age: 31, isAdmin: true },
    { name: 'Jane', age: 20, isAdmin: false },
];

users.push(
    { name: 'Ann', age: 19, isAdmin: false },
    { name: 'Jack', age: 43, isAdmin: true },
);

console.log(users);

// Задание 2.
// Используя массив пользователей users из предыдущего задания, напишите функцию getUserAverageAge(users), которая возвращает средний возраст пользователей.

const users = [
    { name: 'Alex', age: 24, isAdmin: false },
    { name: 'Bob', age: 13, isAdmin: false },
    { name: 'John', age: 31, isAdmin: true },
    { name: 'Jane', age: 20, isAdmin: false },
];

users.push(
    { name: 'Ann', age: 19, isAdmin: false },
    { name: 'Jack', age: 43, isAdmin: true },
);



function getUserAverageAge(users) {
    let sumAge = 0;

    users.forEach(function (user) {
        sumAge += user.age;
    });
    return sumAge / users.length;
};

console.log(getUserAverageAge(users));

// Задание 3.
// Используя массив пользователей users из предыдущего задания, напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.

const users = [
    { name: 'Alex', age: 24, isAdmin: false },
    { name: 'Bob', age: 13, isAdmin: false },
    { name: 'John', age: 31, isAdmin: true },
    { name: 'Jane', age: 20, isAdmin: false },
];

users.push(
    { name: 'Ann', age: 19, isAdmin: false },
    { name: 'Jack', age: 43, isAdmin: true },
);

function getAllAdmins(users) {

    const  admins = [];

    users.forEach(function (user) {
        if (user.isAdmin === true) {
            admins.push(user);
        }
    });
    return admins;

};

console.log(getAllAdmins(users));

// Задание 4.
// Напишите функцию first(arr, n), которая возвращает первые n элементов массива. Если n == 0, возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

const users = [
    { name: 'Alex', age: 24, isAdmin: false },
    { name: 'Bob', age: 13, isAdmin: false },
    { name: 'John', age: 31, isAdmin: true },
    { name: 'Jane', age: 20, isAdmin: false },
];

users.push(
    { name: 'Ann', age: 19, isAdmin: false },
    { name: 'Jack', age: 43, isAdmin: true },
);

function first(arr, n) {

    const result = [];

    if (n === 0) {
        return [];
    } if (n === undefined) {
        n = 1;
    }

    if (n > arr.length) {
        console.log(`Количество n (${n}) больше чем количество пользователей (${arr.length})`);
        return;
    };

    for (let i = 0; i < n && i < arr.length; i++) {
        result.push(arr[i]);
    }

    return result;
}

console.log(first(users, 100));
