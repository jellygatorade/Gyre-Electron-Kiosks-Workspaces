const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const flipbookElement = document.getElementById("flipbook-element");
const firstPage = document.getElementsByClassName("page")[0];
const firstPageImg = firstPage.getElementsByTagName("img")[0];

const pageWidth = firstPageImg.naturalWidth;
const pageHeight = firstPageImg.naturalHeight;
const pageScale = 1.25;

$(flipbookElement).turn({
  acceleration: true,
  autoCenter: true,
  width: pageScale * pageWidth * 2,
  height: pageScale * pageHeight,
});

$(prevBtn).on("click", prevBtnOnClick);

$(nextBtn).on("click", nextBtnOnClick);

function prevBtnOnClick() {
  $(flipbookElement).turn("previous");
}

function nextBtnOnClick() {
  $(flipbookElement).turn("next");
}
