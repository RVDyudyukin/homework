// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.

const person = {
    name: "Roman",
    age: "28",
    city: "Samara",
    student: true,
}

console.log(person);


// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.

const kitchen = {
    cup: "baby",
    table: "oval",
};

function isEmpty(object) {
    for (const key in object) {
        return false;
    };
    return true;
};
console.log(isEmpty(kitchen));


// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.

const task = {
    title: "expression",
    description: "multiply two numbers",
    isCompleted: true,
};

const modifications = {
    title: "example",
    description: "one number",
};

function cloneAndModify(object, modifications) {
    const newTask = { ...object };

    for (let key in modifications) {
        newTask[key] = modifications[key];
    }

    return newTask;
}

console.log(cloneAndModify(task, modifications));

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

const callAllMethods = object => {
    for (const key in object) {
        if (typeof object[key] === "function") {
            object[key]();
        } else {
            console.log("Это не метод");
        }
    }
};

const myObject = {
    method1() {
        console.log('Метод 1 вызван');
    },
    method2() {
        console.log('Метод 2 вызван');
    },
    property: 'Это не метод'
};

callAllMethods(myObject);

