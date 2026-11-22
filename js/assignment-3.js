const form = document.getElementById("form");
const input = document.getElementById("n");
const factorialResult = document.getElementById("factorial");
const sumResult = document.getElementById("sum");
const averageResult = document.getElementById("average");

function factorial(n) {
  let result = 1;
  let i = n;

  while (i > 1) {
    result *= i;
    i--;
  }

  return result;
}

function sum(n) {
  let total = 0;
  let i = 1;

  do {
    total += i;
    i++;
  } while (i <= n);

  return total;
}

function average(n) {
  let total = 0;

  for (let i = 1; i <= n; i++) {
    total += i;
  }

  return total / n;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "Too large";
  if (value > Number.MAX_SAFE_INTEGER) return value.toExponential(4);

  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function setResults(factorialValue, sumValue, averageValue) {
  factorialResult.textContent = factorialValue;
  sumResult.textContent = sumValue;
  averageResult.textContent = averageValue;
}

input.addEventListener("input", () => {
  input.value = input.value.replace(/\D/g, "");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const n = Number(input.value);

  if (n < 1) {
    setResults("—", "—", "—");
    return;
  }

  setResults(
    formatNumber(factorial(n)),
    formatNumber(sum(n)),
    formatNumber(average(n))
  );
});