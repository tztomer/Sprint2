"use strict";

let gCanvas;
let gCtx;
let gStartPos;

function initEditor(img) {
  setSelectedLine(0);
  createCanvas();
  resizeCanvas();
  initLinePositions();
  addListeners();
  renderMeme(img);
  renderStickers();
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

function addListeners() {
  addMouseListeners();
  addTouchListeners();

  window.addEventListener("resize", () => {
    resizeCanvas();
    renderMeme(gCurrImg);
  });
}

function addMouseListeners() {
  gCanvas.addEventListener("mousemove", onMove);
  gCanvas.addEventListener("mousedown", onDown);
  gCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
  gCanvas.addEventListener("touchmove", onMove);
  gCanvas.addEventListener("touchstart", onDown);
  gCanvas.addEventListener("touchend", onUp);
}

function onDown(ev) {
  const pos = getEvPos(ev);
  const isClicked = isLineClicked(pos);
  const lines = getGMeme().lines;
  if (isClicked) {
    setSelectedLine(lines.indexOf(isClicked));
    let lineIdx = lines.indexOf(isClicked);
    pushChooseTxt(lines[lineIdx].txt);
    console.log("i still here?");
    gStartPos = pos;
    gIsClicked = true;
    const diffX = pos.x - gStartPos.x;
    const diffY = pos.y - gStartPos.y;

    moveLine(diffX, diffY);

    renderMeme(gCurrImg);
    markLine(gMeme.lines[gMeme.selectedLineIdx]);

    document.querySelector(".canvas-container").style.cursor = "grabbing";
  } else {
    resetSelectedLine();

    renderMeme(gCurrImg);
  }
}

function onMove(ev) {
  if (gIsClicked) {
    const pos = getEvPos(ev);
    const diffX = pos.x - gStartPos.x;
    const diffY = pos.y - gStartPos.y;
    moveLine(diffX, diffY);
    renderMeme(gCurrImg);
    markLine(gMeme.lines[gMeme.selectedLineIdx]);
    gStartPos = pos;
  }
}

function onUp() {
  gIsClicked = false;
  document.querySelector(".canvas-container").style.cursor = "grab";
}

// Renders meme on canvas
function renderMeme(img) {
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  const memeObj = getGMeme();
  const lines = memeObj.lines;
  lines.forEach(line => makeLine(line));
  markLine(gMeme.lines[gMeme.selectedLineIdx]);
}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetHeight;
}

function pushChooseTxt(text) {
  document.getElementsByName("replace text")[0].placeholder = text;
}

function onSetText(text) {
  console.log("the text original", text);
  setLineText(text);
  console.log("set line text", setLineText(text));

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

function onChooseSticker(sticker) {
  addNewLine(sticker);
  renderMeme(gCurrImg);
}

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

let gCurrSlide = 0;
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
