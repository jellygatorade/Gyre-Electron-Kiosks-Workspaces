const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const zoomInBtn = document.getElementById("zoom-in-btn");
const zoomOutBtn = document.getElementById("zoom-out-btn");

const book = document.getElementById("book");
const firstPage = document.getElementsByClassName("page")[0];
const firstPageImg = firstPage.getElementsByTagName("img")[0];

const zoomViewport = document.getElementById("zoom-viewport");

const pageWidth = firstPageImg.naturalWidth;
const pageHeight = firstPageImg.naturalHeight;
const pageScale = 1.0;

$(book).turn({
  acceleration: true,
  autoCenter: false,
  width: pageScale * pageWidth * 2,
  height: pageScale * pageHeight,
  display: "double",
  page: 1,
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
 * Zoom
 *
 * Following
 * How to get zoom working with turn.js
 * https://stackoverflow.com/questions/17607337/how-to-get-zoom-working-with-turn-js
 */

/**
 * Zoom Setup
 */

const zoomContainer = document.getElementById("zoom-container");

zoomContainer.style.left = pageScale * pageWidth + "px";
zoomContainer.style.top = (pageScale * pageHeight) / 2 + "px";
zoomContainer.style.width = pageScale * pageWidth * 2 + "px";
zoomContainer.style.height = pageScale * pageHeight + "px";

book.style.left = -1 * pageScale * pageWidth + "px";
book.style.top = (-1 * pageScale * pageHeight) / 2 + "px";
book.style.width = pageScale * pageWidth * 2 + "px";
book.style.height = pageScale * pageHeight + "px";

$(zoomViewport).zoom({
  flipbook: $(book),
  max: 2,
});

function resizeViewport() {
  var width = $(window).width(),
    height = $(window).height();
  // options = $('.magazine').turn('options');

  $(zoomViewport)
    .css({
      width: width,
      height: height,
    })
    .zoom("resize");
}
resizeViewport();

/**
 * Zoom Functions
 */

$(zoomInBtn).on("click", zoomInBtnOnClick);

$(zoomOutBtn).on("click", zoomOutBtnOnClick);

function zoomInBtnOnClick() {
  var pos = {
    x: book.offsetWidth / 2,
    y: book.offsetHeight / 2,
  };
  // console.log(pos);
  $(zoomViewport).zoom("zoomIn", pos);
}

function zoomOutBtnOnClick() {
  var pos = {
    x: book.offsetWidth / 2,
    y: book.offsetHeight / 2,
  };
  // console.log(pos);
  $(zoomViewport).zoom("zoomOut", pos);
}

$(book).click(function (e) {
  var pos = {
    x: e.offset().left,
    y: e.offset().top,
  };
  console.log(pos);
  // $(zoomViewport).zoom("zoomIn", pos);
});

// $(book).click(function (e) {
//   var pos = {
//     x: e.pageX - $(this).offset().left,
//     y: e.pageY - $(this).offset().top,
//   };
//   console.log(pos);
//   $(zoomViewport).zoom("zoomIn", pos);
// });
