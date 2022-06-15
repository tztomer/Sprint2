"use strict";
let gCurrImg;
let gIsClicked = false;
const elImagesContainer = document.querySelector(".images-container");
console.log(elImagesContainer);

const pages = ["gallery", "photo-editor"];
// const pages = ["gallery", "photo-editor", "saved", "about", "about-info"];
const gTouchEvs = ["touchstart", "touchmove", "touchend"];
function init() {
  renderGallery();
  renderKeywords();
}

function hmbOpen(ele) {
  // console.log(ele.classList.toggle("open"));
  let open = ele.classList.toggle("open");
  let menu = document.querySelector("nav.main-nav ");
  console.log(open);

  if (open) {
    menu.style.display = "block";
    console.log("im here");
  } else {
    menu.style.display = "none";
  }
}

function onFilterImgs(val) {
  console.log("val", val);
  setFilterImgs(val);
  renderGallery();
}

function renderGallery() {
  const images = getImages();
  console.log(images);
  // let strHTML = ``;
  let imgHTML = images.map(img => {
    return `<image onclick="onSelectImage(${img.id})" src="./images/${img.id}.jpg"></image>`;
  });

  elImagesContainer.innerHTML = imgHTML.join("");
}

// Paging

// Selecting an image from the gallery
function onSelectImage(id) {
  setSelectedImg(id);
  const currImg = getSelectedImg();
  const img = new Image();
  img.src = currImg.url;
  img.onload = () => {
    gCurrImg = img;
    initEditor(img);
  };
  moveToPage("photo-editor");
}

// Moves between pages
function moveToPage(targetPage) {
  pages.forEach(page => {
    document.querySelector(`.${page}`).classList.add("hide");
  });
  document.querySelector(`.${targetPage}`).classList.remove("hide");
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
