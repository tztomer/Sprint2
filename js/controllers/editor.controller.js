"use strict";

let gCtx;
let gCanvas;
let gStartPos;
function initEditor(image) {
  setSelectedLine(0);
  createCanvas();
  resizeCanvas();
  initLinePositions();
  renderStickers();
  renderMeme(image);
  addListeners();
}

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
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetHeight;
}

function onSetText(text) {
  setLineText(text);
  renderMeme(gCurrImg);
}
function renderMeme(img) {
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  const memeObj = getGMeme();
  const lines = memeObj.lines;
  lines.forEach(line => makeLine(line));
  markLine(gMeme.lines[gMeme.selectedLineIdx]);
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

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

function onDownload(link) {
  resetSelectedLine();
  renderMeme(gCurrImg);
  downloadMeme(link);
}

function onShare(link) {
  uploadImg(link);
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

  let sliderHTML = ` <div class="slider"><i onclick=" sliderMoveLeft(event)" class="fa-solid fa-chevron-left"></i>`;
  const emojisHTML = stickers.map(sticker => {
    return `<button class="sticker" onclick="onChooseSticker('${sticker}')">${sticker}</button>`;
  });
  sliderHTML += emojisHTML.join("");
  sliderHTML += `<i onclick=" sliderMoveRight(event)" class="fa-solid fa-chevron-right"></i><div>`;
  console.log(sliderHTML);
  document.querySelector(".stickers-container").innerHTML = sliderHTML;
}

let gCurrSlide = 1;
let gMaxSlide;
// const gEmojis = document.querySelectorAll(".sticker");
let gEmojis;

function goToSlide(s) {
  gEmojis = document.querySelectorAll(".sticker");
  gEmojis.forEach((slide, i) => {
    slide.style.transform = `translate(${100 * (i - s)}%)`;
  });

  gMaxSlide = gEmojis.length;
  console.log(gMaxSlide);
}
goToSlide(0);
function nextSlide() {
  if (gCurrSlide === gMaxSlide - 1) {
    console.log("gcur", gCurrSlide);
    gCurrSlide = 0;
  } else {
    gCurrSlide++;
  }
  goToSlide(gCurrSlide);
}

function prevSlide() {
  if (gCurrSlide === 0) {
    gCurrSlide = gMaxSlide;
  } else {
    gCurrSlide--;
  }
  goToSlide(gCurrSlide);
}

function sliderMoveLeft() {
  nextSlide();
  console.log("move left");
}

function sliderMoveRight() {
  prevSlide();
  console.log("move right");
}

function onChooseSticker(sticker) {
  addNewLine(sticker);
  renderMeme(gCurrImg);
}
