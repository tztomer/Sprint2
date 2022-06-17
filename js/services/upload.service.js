"use strict";
function uploadImg() {
  const imgDataUrl = gCanvas.toDataURL("image/jpeg");
  function onSuccess(uploadedImgUrl) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`);
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append("img", imgDataUrl);

  fetch("//ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then(res => res.text())
    .then(url => {
      onSuccess(url);
    })
    .catch(err => {
      console.error(err);
    });
}

function downloadMeme(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  const randomName = randomNameGen();
  elLink.download = `${randomName}.jpg`;
}
