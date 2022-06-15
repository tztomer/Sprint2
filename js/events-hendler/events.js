"use strict";

// add to

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  // Resizes the canvas and renders it as window size changes
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
