const display = document.getElementById('screen');
const buttonContainer = document.querySelector('.button-container');

//*RESET*
let isFinished = false;

//*KETSTROKES*
function handleInput(value) {
    if (value === "AC") {
        clearDisplay();
    } else if (value === "DEL") {
        deleteLast();
    } else if (value === "=") {
        calculate();
    } else {
        appendValue(value);
    }
}

//*LOGIC*
function appendValue(value) {
    const operators = ['+', '-', '*', '/', '%'];
    
    //*RESET_CHECKER*
    if (isFinished) {
        if (operators.includes(value)) {
            isFinished = false;
        } else {
            display.value = "";
            isFinished = false;
        }
    }
    
    display.value += value;
}

function clearDisplay() {
    display.value = "";
    isFinished = false;
}

function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
    isFinished = false;
}

function calculate() {
    try {
        let expression = display.value.replace(/%/g, '/100');
        
        if (expression.trim() === "") return;

        let result = eval(expression);

        if (result === Infinity || isNaN(result)) {
            display.value = "Error";
            setTimeout(clearDisplay, 1500);
        } else {
            display.value = Number(result.toFixed(8)).toString();
            isFinished = true; // Mark as finished
        }
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

//*DELEGATIONS*

buttonContainer.addEventListener('click', (e) => {
    if (e.target.tagName !== "INPUT") return;
    handleInput(e.target.value);
});

//*KEYBOARD_SUPP*
window.addEventListener('keydown', (event) => {
    const key = event.key;

    // Numbers and Operators
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        handleInput(key);
    } 
    // Result
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleInput('=');
    } 
    // Backspace
    else if (key === 'Backspace') {
        handleInput('DEL');
    } 
    // Clear
    else if (key === 'Escape') {
        handleInput('AC');
    }
});