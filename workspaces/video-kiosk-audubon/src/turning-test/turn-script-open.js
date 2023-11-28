const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const book = document.getElementById("book");
const firstPage = document.getElementsByClassName("page")[0];
const firstPageImg = firstPage.getElementsByTagName("img")[0];

const pageWidth = firstPageImg.naturalWidth;
const pageHeight = firstPageImg.naturalHeight;
const pageScale = 1.25;

$(book).turn({
  acceleration: true,
  autoCenter: false,
  width: pageScale * pageWidth * 2,
  height: pageScale * pageHeight,
  display: "double",
  page: 2, // start open
});

$(prevBtn).on("click", prevBtnOnClick);

$(nextBtn).on("click", nextBtnOnClick);

function prevBtnOnClick() {
  $(book).turn("previous");
}

function nextBtnOnClick() {
  $(book).turn("next");
}

/**
 * Disallow page turning to first and last pages
 */

const length = $(book).turn("pages");

$(book).bind("start", function (e, data, c) {
  if (data.next == 1 || data.next == length) {
    e.preventDefault();
  }
});

$(book).bind("turning", function (e, page, c) {
  if (page == 1 || page == length) {
    e.preventDefault();
  }
});
