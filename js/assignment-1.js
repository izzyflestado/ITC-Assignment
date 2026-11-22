const conversions = {
  "c-to-f": { convert: (c) => (c * 9) / 5 + 32, unit: "°F" },
  "f-to-c": { convert: (f) => ((f - 32) * 5) / 9, unit: "°C" },
  "m-to-ft": { convert: (m) => m * 3.28084, unit: "ft" },
  "ft-to-m": { convert: (ft) => ft / 3.28084, unit: "m" },
};

const blockedKeys = ["e", "E", "+", "-"];

document.querySelectorAll(".box").forEach((box) => {
  const input = box.querySelector("input");
  const result = box.querySelector(".result");
  const { convert, unit } = conversions[box.dataset.type];

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