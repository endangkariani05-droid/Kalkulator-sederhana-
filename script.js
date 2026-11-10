const screen = document.getElementById("screen");
const expressionDisplay = document.getElementById("expression");
const historyList = document.getElementById("history");

let expression = "";
let historyData = [];

function add(value) {
    if (expression === "Error") expression = "";

    expression += value;
    screen.value = expression || "0";
}

function clearAll() {
    expression = "";
    screen.value = "0";
    expressionDisplay.textContent = "";
}

function del() {
    expression = expression.slice(0, -1);
    screen.value = expression || "0";
}

function percent() {
    expression += "/100";
    screen.value = expression;
}

function calculate() {
    try {
        if (!expression) return;

        if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
            throw new Error();
        }

        let result = Function(
            '"use strict";return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) throw new Error();

        let answer = Number(result.toFixed(10));

        expressionDisplay.textContent = expression + " =";
        screen.value = answer;

        historyData.unshift(expression + " = " + answer);
        historyData = historyData.slice(0, 5);

        showHistory();

        expression = String(answer);

    } catch {
        screen.value = "Error";
        expression = "Error";
    }
}

function showHistory() {
    historyList.innerHTML = "";

    historyData.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        li.onclick = () => {
            expression = item.split(" = ")[1];
            screen.value = expression;
        };

        historyList.appendChild(li);
    });
}

function clearHistory() {
    historyData = [];
    showHistory();
}
