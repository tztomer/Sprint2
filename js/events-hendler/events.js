"use strict";

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
