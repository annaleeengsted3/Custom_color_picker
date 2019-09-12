"use strict";
let harmony = "analogous";
let rgb2HEXarray = [];
let fullHex = [];
let baseCol;
let colorArray;
const colorPicker = document.querySelector("#color_picker");

document.querySelector("select").addEventListener("change", function() {
  harmony = this.value;
  updateSwatch();
  console.log(harmony);
});

colorPicker.addEventListener("input", function() {
  baseCol = event.target.value;
  //convertBase2Hex(baseCol);
  updateSwatch();
});

function convertBase2Hex(baseCol) {
  const firstDigitsStart = baseCol.indexOf("(");
  const firstDigitsEnd = baseCol.indexOf(",");
  let r = baseCol.substring(firstDigitsStart + 1, firstDigitsEnd);
  const secondDigitsStart = baseCol.indexOf(",");
  const secondDigitsEnd = baseCol.lastIndexOf(",");
  let g = baseCol.substring(secondDigitsStart + 1, secondDigitsEnd);
  const lastDigitsStart = baseCol.lastIndexOf(",") + 2;
  let b = baseCol.substring(lastDigitsStart, baseCol.length - 1);
  let r2 = parseInt(r, 10).toString(16);
  let g2 = parseInt(g, 10).toString(16);
  let b2 = parseInt(b, 10).toString(16);

  if (r.length == 1) {
    r2 = "0" + r;
  }
  if (g.length == 1) {
    g2 = "0" + g;
  }
  if (b.length == 1) {
    b2 = "0" + b;
  }

  baseCol = `#${r2}${g2}${b2}`;
  updateSwatch();
}

function updateSwatch() {
  showHex();
  const rgbbase = convertToRGB(baseCol);
  const rbase = rgbbase.r;
  const gbase = rgbbase.g;
  const bbase = rgbbase.b;
  const hslbase = convertToHSL(rbase, gbase, bbase);
  const hbase = hslbase.h;
  const sbase = hslbase.s;
  const lbase = hslbase.l;

  if (harmony == "analogous") {
    colorArray = setAnalogousValues(hbase, sbase, lbase);
  } else if (harmony == "monochromatic") {
    colorArray = setMonoValues(hbase, sbase, lbase);
  } else if (harmony == "triad") {
    colorArray = setTriadValues(hbase, sbase, lbase);
  } else if (harmony == "complementary") {
    colorArray = setComplementValues(hbase, sbase, lbase);
  } else if (harmony == "compund") {
    colorArray = setCompoundValues(hbase, sbase, lbase);
  } else if (harmony == "shades") {
    colorArray = setShadesValues(hbase, sbase, lbase);
  }
  showColors(colorArray);
  writeOtherRGBs();
  convertRGB2HEX();
}

function showHex() {
  document.querySelector(".swatchbase").style.backgroundColor = baseCol;
  document.querySelector("#hex").textContent = baseCol;
}

function writeOtherRGBs() {
  for (let i = 1; i < 5; i++) {
    const swatchClass = `.swatch${i}`;
    const nextRGBId = `#rgb${i}`;
    const otherRGBs = document.querySelector(swatchClass).style.backgroundColor;
    document.querySelector(nextRGBId).textContent = otherRGBs;
    rgb2HEXarray.splice(i - 1, i - 1, otherRGBs);
  }
  document.querySelector(
    "body"
  ).style.background = `linear-gradient(to right, ${rgb2HEXarray[1]}, ${
    rgb2HEXarray[0]
  }, ${baseCol}, ${rgb2HEXarray[2]}, ${rgb2HEXarray[3]})`;
}

function convertRGB2HEX() {
  let i = 0;
  rgb2HEXarray.forEach(color => {
    const firstDigitsStart = color.indexOf("(");
    const firstDigitsEnd = color.indexOf(",");
    let r = color.substring(firstDigitsStart + 1, firstDigitsEnd);
    const secondDigitsStart = color.indexOf(",");
    const secondDigitsEnd = color.lastIndexOf(",");
    let g = color.substring(secondDigitsStart + 1, secondDigitsEnd);
    const lastDigitsStart = color.lastIndexOf(",") + 2;
    let b = color.substring(lastDigitsStart, color.length - 1);
    i++;
    let hexId = `#hex${i}`;

    let r2 = parseInt(r, 10).toString(16);
    let g2 = parseInt(g, 10).toString(16);
    let b2 = parseInt(b, 10).toString(16);

    if (r.length == 1) {
      r2 = "0" + r;
    }
    if (g.length == 1) {
      g2 = "0" + g;
    }
    if (b.length == 1) {
      b2 = "0" + b;
    }

    document.querySelector(hexId).textContent = `#${r2}${g2}${b2}`;
  });
}

function showColors(colorArray) {
  for (let i = 1; i < 5; i++) {
    let nextSwatchClass = `.swatch${i}`;
    let pos = i - 1;
    let nextHSLId = `#hsl${i}`;
    let nextHEXId = `#hex${i}`;
    document.querySelector(nextSwatchClass).style.backgroundColor =
      colorArray[pos];

    document.querySelector(nextHSLId).textContent = colorArray[pos];
  }
}

function writeHSL(h, s, l) {
  document.querySelector("#hsl").textContent = `hsl(${h},${s}%,${l}%)`;
}
function writeRGB(r, g, b) {
  document.querySelector("#rgb").textContent = `rgb(${r}, ${g}, ${b})`;
}

function convertToRGB(baseCol) {
  const r = parseInt(baseCol.substring(1, 3), 16);
  const g = parseInt(baseCol.substring(3, 5), 16);
  const b = parseInt(baseCol.substring(5, 7), 16);
  writeRGB(r, g, b);
  console.log(`base color has RGB ${r}, ${g}, ${b}`);
  return { r, g, b };
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

  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  console.log(`base color has HSL ${h}, ${s}, ${l}`);

  writeHSL(h, s, l);

  return { h, s, l };
}

function setAnalogousValues(h, s, l) {
  console.log("analgous logged");
  const col1 = `hsl(${h + 20},${s}%,${l}%)`;
  const col2 = `hsl(${h + 40},${s}%,${l}%)`;
  const col3 = `hsl(${h - 20},${s}%,${l}%)`;
  const col4 = `hsl(${h - 40},${s}%,${l}%)`;

  return [col1, col2, col3, col4];
}

function setMonoValues(h, s, l) {
  console.log("mono logged");
  const col1 = `hsl(${h},${s}%,${l - 20}%)`;
  const col2 = `hsl(${h},${s}%,${l - 40}%)`;
  const col3 = `hsl(${h},${s}%,${l + 20}%)`;
  const col4 = `hsl(${h},${s}%,${l + 40}%)`;

  return [col1, col2, col3, col4];
}

function setTriadValues(h, s, l) {
  console.log("triad logged");
  const col1 = `hsl(${h + 120},${s}%,${l}%)`;
  const col2 = `hsl(${h + 125},${s}%,${l}%)`;
  const col3 = `hsl(${h - 120},${s}%,${l}%)`;
  const col4 = `hsl(${h - 125},${s}%,${l}%)`;

  return [col1, col2, col3, col4];
}

function setComplementValues(h, s, l) {
  console.log("complement logged");
  const col1 = `hsl(${h + 180},${s}%,${l}%)`;
  const col2 = `hsl(${h + 190},${s}%,${l}%)`;
  const col3 = `hsl(${h - 170},${s}%,${l}%)`;
  const col4 = `hsl(${h - 10},${s}%,${l}%)`;

  return [col1, col2, col3, col4];
}

function setCompoundValues(h, s, l) {
  console.log("compound logged");
  const col1 = `hsl(${h},${s}%,${l - 20}%)`;
  const col2 = `hsl(${h + 20},${s}%,${l}%)`;
  const col3 = `hsl(${h - 180},${s}%,${l}%)`;
  const col4 = `hsl(${h - 160},${s}%,${l}%)`;

  return [col1, col2, col3, col4];
}

function setShadesValues(h, s, l) {
  console.log("shades logged");
  const col1 = `hsl(${h},${s + 20}%,${l}%)`;
  const col2 = `hsl(${h},${s + 40}%,${l}%)`;
  const col3 = `hsl(${h},${s - 20}%,${l}%)`;
  const col4 = `hsl(${h},${s - 40}%,${l}%)`;

  return [col1, col2, col3, col4];
}
