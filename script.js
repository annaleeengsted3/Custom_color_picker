"use strict";

const colorPicker = document.querySelector("#color_picker");
//input: every time user changes color, change: when user closes picker
colorPicker.addEventListener("input", updateSwatch, false);
// colorPicker.addEventListener("change", watchColorPicker, false);

function updateSwatch() {
  const color = event.target.value;
  document.querySelector("#swatch").style.backgroundColor = color;
  //   console.log(event.target.value);

  showHex(color);
}

function showHex(color) {
  document.querySelector("#hex").textContent = color;
  createSubstringHex(color);
}

function createSubstringHex(color) {
  //   console.log(`hex code is: ${color}`);
  const hex1 = color.substring(1, 3);
  const hex2 = color.substring(3, 5);
  const hex3 = color.substring(5);
  //   console.log(`first 2 digits R is: ${hex1}`);
  //   console.log(`next 2 digits G is: ${hex2}`);
  //   console.log(`last 2 digits B is: ${hex3}`);
  //   console.log(parseInt(hex1, 16));
  //   console.log(parseInt(hex2, 16));
  //   console.log(parseInt(hex3, 16));
  convertToRGB(hex1, hex2, hex3);
}

function convertToRGB(hex1, hex2, hex3) {
  const r = parseInt(hex1, 16);
  const g = parseInt(hex2, 16);
  const b = parseInt(hex3, 16);
  showRGB(r, g, b);
}

function showRGB(r, g, b) {
  document.querySelector("#rgb").textContent = `(${r}, ${g} ${b})`;
  convertToHSL(r, g, b);
}

function convertToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  //   console.log("before hsl(%f,%f%,%f%)", h, s, l);
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  showHSL(h, s, l);
}

function showHSL(h, s, l) {
  const H = Math.round(h);
  const S = Math.round(s);
  const L = Math.round(l);
  console.log(H, S, L);
  document.querySelector("#hsl").textContent = `${H}, ${S}%, ${L}%`;
}
