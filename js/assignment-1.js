const conversions = {
  "c-to-f": { convert: (c) => (c * 9) / 5 + 32, unit: "°F", allowNegative: true },
  "f-to-c": { convert: (f) => ((f - 32) * 5) / 9, unit: "°C", allowNegative: true },
  "m-to-ft": { convert: (m) => m * 3.28084, unit: "ft", allowNegative: false },
  "ft-to-m": { convert: (ft) => ft / 3.28084, unit: "m", allowNegative: false },
};

document.querySelectorAll(".box").forEach((box) => {
  const input = box.querySelector("input");
  const result = box.querySelector(".result");
  const { convert, unit, allowNegative } = conversions[box.dataset.type];

 const blockedKeys = allowNegative ? ["e", "E", "+"] : ["e", "E", "+", "-"];
 const validPaste = allowNegative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;


  input.addEventListener("keydown", (event) => {
    if (blockedKeys.includes(event.key)) {
      event.preventDefault();
    }
  });

  input.addEventListener("paste", (event) => {
    const text = event.clipboardData.getData("text");

    if (!/^\d*\.?\d*$/.test(text)) {
      event.preventDefault();
    }
  });

  input.addEventListener("input", () => {
    if (input.value === "") {
      result.textContent = "—";
      return;
    }

    const answer = convert(Number(input.value));
    result.textContent = `${answer.toFixed(2)} ${unit}`;
  });
});