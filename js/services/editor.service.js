"use strict";
const DB = "savedDB";

let gStickers = ["😂", "😴", "🤡", "💩", "😡", "🤬"];

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      pos: {
        x: 0,
        y: 0,
      },
      txt: "Not sure if im good at programming or good at googling",
      size: 20,
      align: "center",
      fillColor: "white",
      strokeColor: "black",
      isSelected: false,
      fontfamily: "impact",
    },
    {
      pos: {
        x: 0,
        y: 0,
      },
      txt: "One does not simply write js",
      size: 20,
      align: "center",
      fillColor: "white",
      strokeColor: "black",
      isSelected: false,
      fontfamily: "impact",
    },
  ],
};

function getGMeme() {
  return gMeme;
}

function setSelectedImg(id) {
  gMeme.selectedImgId = id;
}

function getSelectedImg() {
  const imgs = getImages();
  return imgs.find(img => img.id === gMeme.selectedImgId);
}

function moveLine(diffX, diffY) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += diffX;
  gMeme.lines[gMeme.selectedLineIdx].pos.y += diffY;
}

function isLineClicked(clickedPos) {
  const clickedLine = gMeme.lines.find(line => {
    if (Math.sqrt((clickedPos.x - line.pos.x) ** 2 + (clickedPos.y - line.pos.y) ** 2) <= gCtx.measureText(line.txt).width / 2) {
      console.log("line", line);
      return line;
    }
  });

  return clickedLine;
}

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
  if (gMeme.selectedLineIdx >= 0) {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
      gMeme.lines[gMeme.selectedLineIdx].isSelected = false;
      gMeme.selectedLineIdx = 0;
      gMeme.lines[gMeme.selectedLineIdx].isSelected = true;
    } else {
      gMeme.lines[gMeme.selectedLineIdx].isSelected = false;
      gMeme.selectedLineIdx++;
      gMeme.lines[gMeme.selectedLineIdx].isSelected = true;
    }
  } else {
    gMeme.selectedLineIdx = 0;
    gMeme.lines[0].isSelected = true;
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
  // if (!gMeme.selectedLineIdx >= 0) return
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = val;
}

function changeFillColor(val) {
  // if (!gMeme.selectedLineIdx >= 0) return
  gMeme.lines[gMeme.selectedLineIdx].fillColor = val;
}

function changeTextFont(val) {
  // if (!gMeme.selectedLineIdx >= 0) return
  gMeme.lines[gMeme.selectedLineIdx].fontfamily = `${val}, sans-serif `;
}

// Makes the text line
function makeLine(line) {
  gCtx.textBaseline = "middle";
  gCtx.textAlign = line.align;
  gCtx.strokeStyle = line.strokeColor;
  gCtx.fillStyle = line.fillColor;
  gCtx.font = `${line.size}px ${line.fontfamily}`;

  gCtx.fillText(line.txt, line.pos.x, line.pos.y);
  gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
}

// Marks the text line while selected
function markLine(line) {
  if (!line) return;
  const lineWidth = gCtx.measureText(line.txt).width + line.size;
  const lineHeight = line.size + 30;
  gCtx.strokeStyle = "orange";
  gCtx.strokeRect(line.pos.x - lineWidth / 2 - 20, line.pos.y - lineHeight / 2, lineWidth + 20, lineHeight);
}

function addNewLine(txt = "Write hello world , add to cv 7 years experienced") {
  resetSelectedLine();
  const line = {
    txt: txt,
    size: 70,
    align: "center",
    fillColor: "white",
    strokeColor: "black",
    pos: {
      x: gCanvas.width / 2,
      y: gCanvas.height / 2,
    },
    fontfamily: "impact",
    isSelected: true,
  };
  gMeme.lines.push(line);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  markLine(gMeme.lines[gMeme.selectedLineIdx]);
}

// Deletes line

function deleteLine() {
  const selectedLineIdx = gMeme.selectedLineIdx;
  if (selectedLineIdx >= 0) {
    gMeme.lines.splice(selectedLineIdx, 1);
    if (gMeme.lines.length) {
      gMeme.selectedLineIdx = selectedLineIdx === 1 ? gMeme.selectedLineIdx - 1 : 0;
      console.log(gMeme.selectedLineIdx);
      gMeme.lines[gMeme.selectedLineIdx].isSelected = true;
    }
  }
}

function saveMemeToStorage(meme) {
  let savedMemes = loadFromStorage(DB);
  if (!savedMemes || savedMemes === null) {
    savedMemes = [meme];
    saveToStorage(DB, savedMemes);
    return;
  }
  savedMemes.push(meme);
  saveToStorage(DB, savedMemes);
}

function getSavedMemes() {
  return loadFromStorage(DB);
}

function getStickers() {
  return gStickers;
}
