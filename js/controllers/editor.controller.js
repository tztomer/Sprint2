"use strict";

let gCtx;
let gCanvas;
let gStartPos;
function initEditor(image) {
  createCanvas();
  initLinePositions();
  addListeners();
  resizeCanvas();
  renderMeme(image);
}

// Creates canvas and access to its context
function createCanvas() {
  gCanvas = document.querySelector("#meme-canvas");
  gCtx = gCanvas.getContext("2d");
}

function initLinePositions() {
  const meme = getGMeme();
  meme.lines[0].pos = {
    x: gCanvas.width / 2,
    y: 50,
  };
  meme.lines[1].pos = {
    x: gCanvas.width / 2,
    y: gCanvas.height - 50,
  };
}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  console.log("elContainer", elContainer);
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetHeight;
}

function onSetText(text) {
  setLineText(text);
  renderMeme(gCurrImg);
}

// Renders meme on canvas
function renderMeme(img) {
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  const memeObj = getGMeme();
  const lines = memeObj.lines;
  lines.forEach(line => makeLine(line));
  markLine(gMeme.lines[gMeme.selectedLineIdx]);
}

function onSave() {
  resetSelectedLine();
  renderMeme(gCurrImg);
  const meme = gCanvas.toDataURL("image/jpeg");
  saveMemeToStorage(meme);
  renderSaved();
  moveToPage("saved");
}
