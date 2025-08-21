const digitButtons = {
    0: document.getElementById('0'),
    1: document.getElementById('1'),
    2: document.getElementById('2'),
    3: document.getElementById('3'),
    4: document.getElementById('4'),
    5: document.getElementById('5'),
    6: document.getElementById('6'),
    7: document.getElementById('7'),
    8: document.getElementById('8'),
    9: document.getElementById('9')
};

const operatorButtons = {
    add: document.querySelector('.add'),
    subtract: document.querySelector('.subtract'),
    multiply: document.querySelector('.multiply'),
    divide: document.querySelector('.divide'),
}

const specialButtons = {
    clear: document.querySelector('.clear'),
    allclear: document.querySelector('.allclear'),
    toggle: document.querySelector('.toggle'),
    decimal: document.querySelector('.decimal'),
    equal: document.querySelector('.equal')
}

const display = document.querySelector('.display');

// let displayOutput = "";

let number1 = 0;
let number2 = 0;
let result = 0;
let currentOperator = null;
let currentNumber = "";

// Functions for math operations
function add (a, b) {
    return result = a + b;
}

function subtract (a, b) {
    return result = a - b;
}

function multiply (a, b) {
    return result = a * b;
}

function divide (a, b) {
    if (b === 0) {
        return result = "Error";
    }
    return a / b;
}

// Function for handling operation function based on what operator is used
function operate (a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '÷':
            return divide(a, b);
            break;
        default:
            return "Error";
    }
}

//Event listener for digit buttons
Object.keys(digitButtons).forEach(digit => {
    digitButtons[digit].addEventListener('click', () => {
        currentNumber += digit;

        console.log(`Digit ${digit} clicked`);
        console.log(currentNumber);
    })
})

//Event listener for operator buttons
Object.keys(operatorButtons).forEach(opName => {
    operatorButtons[opName].addEventListener('click', () => {
        number1 = Number(currentNumber);
        console.log(`Current number ${currentNumber} became the number1 ${number1}`);

        currentOperator = operatorButtons[opName].textContent;
        console.log(`${opName} operator selected: ${currentOperator}`);

        currentNumber = "";
        console.log(`Current number is ${currentNumber}`);
    })
})

