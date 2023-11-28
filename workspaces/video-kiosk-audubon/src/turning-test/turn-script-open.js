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
 *
 */

// console.log($("book").turn("pages")); // ??
const length = $(book).children().length;
// const length = $("book").turn("pages");  // ??
console.log(length);

$(book).bind("start", function (e, data, c) {
  // console.log(data);
  if (data.next == 1 || data.next == length - 2) {
    e.preventDefault();
  }
});
$(book).bind("turning", function (e, page, c) {
  console.log(page);
  if (page == 1 || page == length - 2) {
    e.preventDefault();
  }
});
