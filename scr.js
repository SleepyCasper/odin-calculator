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

let displayOutput = "";
let number1 = "";
let number2 = "";
let result = 0;
let currentOperator = null;
let currentNumber = "";
let isError = false;

// Functions for math operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        isError = true;
        return "Error";
    }
    return a / b;
}

// Handle big result numbers
function formatForDisplay(number) {
    if (typeof number !== 'number') return number;

    number = parseFloat(number.toFixed(10));

    let str = number.toString();

    if (str.length > 12) {
        return number.toExponential(6);
    }

    return number;
}

function reset() {
    currentOperator = null;
    currentNumber = "";
    number1 = ""; 
    number2 = "";
    result = 0;
    isError = false;
    display.textContent = "";
    console.log("Calculator reset");
}

// Function for handling operation function based on what operator is used
function operate(a, b, operator) {
    let result = 0;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            if (result === "Error") {
                reset();  // Reset here if division by zero
                display.textContent = "Error";
                isError = true;
                return "Error";
            }
            break;
        default:
            return "Error";
    }
    return formatForDisplay(result);
}


//Event listener for digit buttons
Object.keys(digitButtons).forEach(digit => {
    digitButtons[digit].addEventListener('click', () => {
        if (isError) {
            reset();
        }
        currentNumber += digit;
        displayOutput = formatForDisplay(Number(currentNumber));
        display.textContent = displayOutput;

        console.log(`Digit ${digit} clicked`);
        console.log(currentNumber);
    })
})

//Event listener for operator buttons
Object.keys(operatorButtons).forEach(opName => {
    operatorButtons[opName].addEventListener('click', () => {
        // Prevent operations when in error state
        if (isError) {
            console.log("Calculator in error state, ignoring operator");
            return;
        }

        // When pressing multiple operators in a row
        if (number1 !== "" && currentOperator !== null && currentNumber === "") {
            // Just replace the operator, don't calculate
            currentOperator = operatorButtons[opName].textContent;
            console.log(`Operator replaced with: ${currentOperator}`);
            return; // Exit early
        }

        // For chaining
        if (number1 !== "" && currentOperator !== null && currentNumber !== "") {
            number2 = Number(currentNumber);
            console.log(`Current number ${currentNumber} became the number2 ${number2}`);

            result = operate(number1, number2, currentOperator);
            
            if (result === "Error") {
                return; // Stop execution if error
            }

            console.log(`Result is ${result}`);
            number1 = result;
            display.textContent = result;
        } else if (currentNumber !== "") {
            number1 = Number(currentNumber);  
            console.log(`Current number ${currentNumber} became the number1 ${number1}`);
        } else {    //If pressing operator in the start
            console.log("No number entered yet, ignoring operator");
            return;
        }

        currentOperator = operatorButtons[opName].textContent;
        console.log(`${opName} operator selected: ${currentOperator}`);

        currentNumber = "";
        console.log(`Current number is ${currentNumber}`);
    })
})

specialButtons.allclear.addEventListener('click', reset);

specialButtons.clear.addEventListener('click', () => {
    currentNumber = currentNumber.toString().slice(0, -1);
    console.log(`You deleted the last digit! current number is ${currentNumber}`)
    display.textContent = currentNumber || "0"; // Show 0 if empty
})

specialButtons.equal.addEventListener('click', () => {
    if (currentOperator && currentNumber !== "") {
        number2 = Number(currentNumber);
        console.log(`Current number ${currentNumber} became the number2 ${number2}`);

        result = operate(number1, number2, currentOperator);
        console.log(`Result is ${result}`);

        number1 = result;
        display.textContent = result;
        currentOperator = null;
        currentNumber = result;
        console.log("Ready for next operation")
        console.log(`number1 is ${number1}`)
    } 
})

function toggle () {
    if (currentNumber === "" || currentNumber === "0") {
        return;
    }
    currentNumber = (Number(currentNumber) * -1).toString();
    displayOutput = formatForDisplay(Number(currentNumber));
    display.textContent = displayOutput;

    console.log(`Number toggled to: ${currentNumber}`);
}

specialButtons.toggle.addEventListener('click', toggle);

function decimal () {
    if (currentNumber === "") {
        currentNumber = "0.";
        display.textContent = currentNumber;
        return;
    }
    
    if (currentNumber.includes(".") || result == "Error") {
        return;
    }

    currentNumber += ".";
    displayOutput = formatForDisplay(currentNumber);
    display.textContent = displayOutput;
}

specialButtons.decimal.addEventListener('click', decimal);