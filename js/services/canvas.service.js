"use strict";

function setLineText(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function setSelectedLine(idx) {
  resetSelectedLine();
  gMeme.lines[idx].isSelected = true;
  gMeme.selectedLineIdx = idx;
}

function updateSelectedLine() {
  if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
    gMeme.lines[gMeme.selectedLineIdx].isSelected = false;
    gMeme.selectedLineIdx = 0;
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true;
  } else {
    gMeme.lines[gMeme.selectedLineIdx].isSelected = false;
    gMeme.selectedLineIdx++;
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true;
  }
}

function resetSelectedLine() {
  gMeme.lines.forEach((_, idx) => {
    gMeme.lines[idx].isSelected = false;
  });
  gMeme.selectedLineIdx = -1;
}

function setTextSize(val) {
  gMeme.lines[gMeme.selectedLineIdx].size += val;
}

// point!!!!!!!!!
// function setTextAlignment(val) {
//   gMeme.lines[gMeme.selectedLineIdx].align = val;
// }

function setTextAlignment(val) {
  const line = gMeme.lines[gMeme.selectedLineIdx];
  if (val === "end") {
    line.pos.x = gCanvas.width - gCanvas.width / 3;
  } else if (val === "start") {
    line.pos.x = gCanvas.width / 3;
  } else if (val === "center") {
    line.pos.x = gCanvas.width / 2;
  }
}

function changeStrokeColor(val) {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = val;
}

function changeFillColor(val) {
  gMeme.lines[gMeme.selectedLineIdx].fillColor = val;
}

function changeTextFont(val) {
  gMeme.lines[gMeme.selectedLineIdx].fontfamily = val;
}
