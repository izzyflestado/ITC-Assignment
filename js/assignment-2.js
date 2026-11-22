const incomeInput = document.getElementById("income");
const taxResult = document.getElementById("tax");


const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

// Highest bracket first
const brackets = [
  { over: 8000000, baseTax: 2410000, rate: 0.35 },
  { over: 2000000, baseTax: 490000, rate: 0.32 },
  { over: 800000, baseTax: 130000, rate: 0.3 },
  { over: 400000, baseTax: 30000, rate: 0.25 },
  { over: 250000, baseTax: 0, rate: 0.2 },
];

function computeTax(income) {
  const bracket = brackets.find((b) => income > b.over);

  if (!bracket) return 0;

  return bracket.baseTax + (income - bracket.over) * bracket.rate;
}

function formatIncome(value) {
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

incomeInput.addEventListener("input", () => {
  const caret = incomeInput.selectionStart;
  const validBeforeCaret = incomeInput.value
    .slice(0, caret)
    .replace(/[^\d.]/g, "").length;

  incomeInput.value = formatIncome(incomeInput.value);

  const position = getCaretPosition(incomeInput.value, validBeforeCaret);
  incomeInput.setSelectionRange(position, position);

  const rawValue = incomeInput.value.replace(/,/g, "");

  if (rawValue === "" || rawValue === ".") {
    taxResult.textContent = "—";
    return;
  }

  taxResult.textContent = currency.format(computeTax(Number(rawValue)));
});