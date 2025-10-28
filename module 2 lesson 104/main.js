const data = {
    Roman: {
        age: 28,
        studentAroken: true,
        isAdmin: true
    },
    Alex: {
        age: 30,
        studentAroken: true,
        isAdmin: false
    },
    Eva: {
        age: 30,
        studentAroken: true,
        isAdmin: false
    },
    Mari: {
        age: 36,
        studentAroken: false,
        isAdmin: true
    },

    sayHello(name) {
        console.log(`Hello ${name}`)
    }
}

console.log(data.Roman)
data.sayHello(`Ivan`)

// =========================================================================

const users = [
    {
        name: `Ivan`,
        age: 22,
        isAdmin: true
    },
    {
        name: `Alex`,
        age: 32,
        isAdmin: false
    },
    {
        name: `Tom`,
        age: 26,
        isAdmin: false
    },
    {
        name: `Sofi`,
        age: 25,
        isAdmin: true
    },
    {
        name: `Sofdif`,
        age: 21,
        isAdmin: false
    }
]

let checkForAdmin = 0;
for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    if (!currentUser.isAdmin) {
        checkForAdmin++;
    }
}
// for (let i of users) {
//     if (!i.isAdmin) {
//         checkForAdmin ++;
//     }
// }
console.log(`Количество простых пользователей: ` + checkForAdmin)