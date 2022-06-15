"use strict";
let gCurrImg;
let gIsClicked = false;
const elImagesContainer = document.querySelector(".images-container");
const pages = ["gallery", "editor", "saved", "about", "about-info"];
const gTouchEvs = ["touchstart", "touchmove", "touchend"];

function init() {
  renderGallery();
  renderKeywords();
}

function onFilterImgs(val) {
  console.log("val", val);
  setFilterImgs(val);
  renderGallery();
}

function renderGallery() {
  const images = getImages();
  let strHTML = ``;
  let imgHTML = images.map(img => {
    return `<image src="../images/${img.id}.jpg"></image>`;
  });

  elImagesContainer.innerHTML = imgHTML.join("");
}

// Filters the images by search/keywords

// Renders keywords
function renderKeywords() {
  let keywords = getKeywords();
  let strHTMLs = '<a data-word="all" onclick="onFilterImgs(this.dataset.word)" style="font-size: 18px;">All</a>';
  for (let key in keywords) {
    strHTMLs += `<a class="category-selections" data-word="${key}" onclick="onFilterImgs(this.dataset.word); onSizeUpKeyword(this.dataset.word)" style="font-size: ${
      keywords[key] + 6
    }px;">${key[0].toUpperCase() + key.slice(1)}</a>`;
  }
  document.querySelector(".categories").innerHTML = strHTMLs;
}

function onSizeUpKeyword(word) {
  console.log("word", word);
  sizeUpKeyword(word);
  init();
}
