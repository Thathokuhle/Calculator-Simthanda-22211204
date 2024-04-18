let isPowerOn = false;
const toggleBtn = document.querySelector(".toggleMode");
const toggleBtnText = document.getElementById("switchMode");
const Screen = document.querySelector(".value");
let toggleAllButtons = document.querySelectorAll(".num");

document.addEventListener("DOMContentLoaded", function() {
    toggleBtn.addEventListener("click", function() {
        if (isPowerOn === false) {
            Screen.style.backgroundColor = "#c3fff2";
            Screen.placeholder = "0";
            toggleBtnText.value = "OFF";
            toggleBtnText.style.backgroundColor = "rgb(112, 168, 82)";
            toggleAllButtons.forEach(function(button) {
                button.disabled = true;
            });
            isPowerOn = true;
            clearMyisplay();
        } else {
            toggleBtnText.value = "ON";
            Screen.placeholder = "Calculator Is Off";
            toggleBtnText.style.backgroundColor = "rgb(168, 82, 82)";
            Screen.style.backgroundColor = "#5e7d77";
            toggleAllButtons.forEach(function(button) {
                button.disabled = false;
            });
            isPowerOn = false;
            clearMyisplay();
        }
    });
});

let onscreenValue = "0";
let waitForSecondumber = true;
let currentOperator = null;
let result = null;

const myDisplay = document.getElementById("display");

function updateMyDisplay() {
    myDisplay.value = onscreenValue;
}

function clearMyisplay() {
    onscreenValue = "";
    waitForSecondumber = false;
    currentOperator = null;
    result = null;
    updateMyDisplay();
}

function DisplayOnScreen(input) {
    if (onscreenValue === "" || waitForSecondumber) {
        if (input === ".") {
            onscreenValue = "0" + input;
            waitForSecondumber = false;
        } else {
            onscreenValue = input;
            waitForSecondumber = false;
        }
    } else {
        onscreenValue += input;
    }
    updateMyDisplay();
}

function getOperator(operator) {
    if (result === null) {
        result = onscreenValue;
    } else {
        CalculateResult();
    }

    currentOperator = operator;
    waitForSecondumber = true;
}

function CalculateResult() {
    if (waitForSecondumber) {
        return;
    }
    let secondOperand = parseFloat(onscreenValue);
    switch (currentOperator) {
        case "+":
            result = parseFloat(result) + secondOperand;
            break;
        case "-":
            result = parseFloat(result) - secondOperand;
            break;
        case "*":
            result = parseFloat(result) * secondOperand;
            break;
        case "/":
            if (secondOperand !== 0) {
                result = parseFloat(result) / secondOperand;
            } else {
                result = "Error: Division by zero";
            }
            break;
        case "%":
            result = result % secondOperand;
            break;
        default:
            return; // No operator selected, do nothing
    }
    onscreenValue = result.toString();
    updateMyDisplay();
    waitForSecondumber = true;
}