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
  renderStickers();
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
  // console.log("elContainer", elContainer);
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

// Renders text input from text box

function onSetText(text) {
  setLineText(text);
  renderMeme(gCurrImg);
}

function onSwitchLine() {
  updateSelectedLine();
  renderMeme(gCurrImg);
}

function onChangeTextSize(val) {
  setTextSize(val);
  renderMeme(gCurrImg);
}

function onChangeTextAlignment(val) {
  setTextAlignment(val);
  renderMeme(gCurrImg);
}

function onAddLine() {
  addNewLine();
  renderMeme(gCurrImg);
}

function onDeleteLine() {
  deleteLine();
  renderMeme(gCurrImg);
}

function onChangeStrokeColor(val) {
  changeStrokeColor(val);
  gCtx.strokeStyle = val;
  renderMeme(gCurrImg);
}

function onChangeFillColor(val) {
  changeFillColor(val);
  renderMeme(gCurrImg);
}

function onChangeTextFont(val) {
  changeTextFont(val);
  renderMeme(gCurrImg);
}

function onDownload(ellink) {
  resetSelectedLine();
  renderMeme(gCurrImg);
  downloadMeme(ellink);
}

function onShare(ellink) {
  uploadImg(ellink);
}

function onSave() {
  resetSelectedLine();
  renderMeme(gCurrImg);
  const meme = gCanvas.toDataURL("image/jpeg");
  saveMemeToStorage(meme);
  renderSaved();
  moveToPage("saved");
}

// Renders stickers

function renderStickers() {
  const stickers = getStickers();
  const strHTMLs = stickers.map(sticker => {
    return `<button class="sticker" onclick="onChooseSticker('${sticker}')">${sticker}</button>`;
  });
  document.querySelector(".stickers-container").innerHTML = strHTMLs.join("");
}

function onChooseSticker(sticker) {
  addNewLine(sticker);
  renderMeme(gCurrImg);
}
