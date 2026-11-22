const addForm = document.getElementById("add-form");
const deleteForm = document.getElementById("delete-form");
const nameInput = document.getElementById("employee-name");
const daysInput = document.getElementById("days");
const rateInput = document.getElementById("rate");
const deductionInput = document.getElementById("deduction");
const lineInput = document.getElementById("line");
const tableBody = document.getElementById("payroll-body");

const employees = [];

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

function formatAmount(value) {
  const cleaned = value.replace(/[^\d.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  const integer = whole
    .replace(/^0+(?=\d)/, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (rest.length === 0) return integer;

  return `${integer}.${rest.join("").slice(0, 2)}`;
}

function getCaretPosition(formatted, digitCount) {
  let position = 0;
  let count = 0;

  while (position < formatted.length && count < digitCount) {
    if (formatted[position] !== ",") count++;
    position++;
  }

  return position;
}

function bindAmountInput(input) {
  input.addEventListener("input", () => {
    const caret = input.selectionStart;
    const validBeforeCaret = input.value
      .slice(0, caret)
      .replace(/[^\d.]/g, "").length;

    input.value = formatAmount(input.value);

    const position = getCaretPosition(input.value, validBeforeCaret);
    input.setSelectionRange(position, position);
  });
}

function toNumber(value) {
  return Number(value.replace(/,/g, "")) || 0;
}

function createRow(employee, index) {
  const gross = employee.days * employee.rate;
  const net = gross - employee.deduction;

  const values = [
    index + 1,
    employee.name,
    employee.days,
    currency.format(employee.rate),
    currency.format(gross),
    currency.format(employee.deduction),
    currency.format(net),
  ];

  const row = document.createElement("tr");

  values.forEach((value, column) => {
    const cell = document.createElement("td");

    cell.textContent = value;
    cell.classList.toggle("num", column > 1);
    row.appendChild(cell);
  });

  return row;
}

function render() {
  tableBody.replaceChildren(...employees.map(createRow));
}

bindAmountInput(rateInput);
bindAmountInput(deductionInput);

const MAX_DAYS = 366;

daysInput.addEventListener("input", () => {
  const digits = daysInput.value.replace(/\D/g, "");

  daysInput.value = Number(digits) > MAX_DAYS ? String(MAX_DAYS) : digits;
});

lineInput.addEventListener("input", () => {
  lineInput.value = lineInput.value.replace(/\D/g, "");
  lineInput.setCustomValidity("");
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  employees.push({
    name: nameInput.value.trim(),
    days: Number(daysInput.value),
    rate: toNumber(rateInput.value),
    deduction: toNumber(deductionInput.value),
  });

  addForm.reset();
  nameInput.focus();
  render();
});

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const line = Number(lineInput.value);

  if (line < 1 || line > employees.length) {
    lineInput.setCustomValidity("Line number not found.");
    lineInput.reportValidity();
    return;
  }

  employees.splice(line - 1, 1);

  deleteForm.reset();
  render();
});