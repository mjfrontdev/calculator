class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === "0") return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === "") this.currentOperand = "0";
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number;
    } else {
      this.currentOperand = this.currentOperand.toString() + number;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "0") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        if (current === 0) {
          alert("تقسیم بر صفر ممکن نیست!");
          return;
        }
        computation = prev / current;
        break;
      case "%":
        computation = prev % current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "0";
    } else {
      integerDisplay = integerDigits.toLocaleString("fa-IR");
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-action]");
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');
const previousOperandElement = document.getElementById("previous-operand");
const currentOperandElement = document.getElementById("current-operand");

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.dataset.number);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.action === "equals") {
      calculator.compute();
    } else if (button.dataset.action === "clear") {
      calculator.clear();
    } else if (button.dataset.action === "delete") {
      calculator.delete();
    } else {
      calculator.chooseOperation(button.innerText);
    }
    calculator.updateDisplay();
  });
});

// --- تغییر تم ---
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const calculatorBox = document.querySelector('.calculator');

function setTheme(isDark) {
  if (isDark) {
    body.classList.add("dark");
    themeToggleBtn.innerText = "\u2600\ufe0f";
  } else {
    body.classList.remove("dark");
    themeToggleBtn.innerText = "\ud83c\udf19";
  }
  // انیمیشن تغییر تم
  anime({
    targets: calculatorBox,
    scale: [0.97, 1],
    rotateZ: [0, 2, -2, 0],
    duration: 500,
    easing: 'easeInOutElastic(1, .7)'
  });
}

// ذخیره تم در localStorage
if (localStorage.getItem("calc-theme") === "dark") {
  setTheme(true);
}

themeToggleBtn.addEventListener("click", () => {
  const isDark = !body.classList.contains("dark");
  setTheme(isDark);
  localStorage.setItem("calc-theme", isDark ? "dark" : "light");
});

// --- افکت موجی و لرزش برای دکمه‌ها ---
const allButtons = document.querySelectorAll('.buttons button');
allButtons.forEach(btn => {
  btn.classList.add('animated');
  btn.addEventListener('click', function(e) {
    // افکت موجی
    btn.classList.remove('active');
    void btn.offsetWidth; // reflow
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 400);
    // افکت لرزش با animejs
    anime({
      targets: btn,
      translateX: [0, -4, 4, -2, 2, 0],
      duration: 350,
      easing: 'easeInOutSine'
    });
  });
});

// --- مقداردهی اولیه AOS ---
if (typeof AOS !== 'undefined') {
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
  });
}

// --- افکت پالس برای نمایشگر هنگام نمایش نتیجه ---
const displayBox = document.querySelector('.display');
const equalsBtn = document.querySelector('.equals');

function pulseDisplay() {
  displayBox.classList.remove('pulse');
  void displayBox.offsetWidth;
  displayBox.classList.add('pulse');
}

displayBox.addEventListener('animationend', function() {
  displayBox.classList.remove('pulse');
});

equalsBtn.addEventListener('click', () => {
  setTimeout(pulseDisplay, 50);
});
