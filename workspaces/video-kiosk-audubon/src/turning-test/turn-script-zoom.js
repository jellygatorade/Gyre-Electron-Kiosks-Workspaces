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
console.log(pageWidth, pageWidth * 2, pageHeight);
const pageScale = 1.0;

$(book).turn({
  // acceleration: true,
  autoCenter: true,
  width: 1152,
  height: 752,
  // pages: 6,

  // width: pageScale * pageWidth * 2,
  // height: pageScale * pageHeight,

  // gradients: false,
  // display: "double",
  // page: 1,
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
 *
 * See also
 * http://www.turnjs.com/samples/magazine/
 * https://github.com/blasten/turn.js/issues/603
 */

/**
 * Zoom Setup
 */

const zoomContainer = document.getElementById("zoom-container");

zoomContainer.style.width = pageScale * pageWidth * 2 + "px";
zoomContainer.style.height = pageScale * pageHeight + "px";

book.style.left = -1 * pageScale * pageWidth + "px";
book.style.top = (-1 * pageScale * pageHeight) / 2 + "px";
book.style.position = "relative";
book.style.width = pageScale * pageWidth * 2 + "px";
book.style.height = pageScale * pageHeight + "px";

$(zoomViewport).zoom({
  flipbook: $(book),
  max: 2,
  duration: 500,
  when: {
    // zoomIn: function () {
    //   console.log(book);
    //   // resizeViewport();
    //   // writeOffsetLeft();
    //   // setInterval(writeOffsetLeft, 5);
    // },
    tap: function (event) {
      // if ($(this).zoom("value") == 1) {
      //   $(book).removeClass("animated").addClass("zoom-in");
      //   //$(this).zoom("zoomIn", event);
      // } else {
      //   //$(this).zoom("zoomOut");
      // }
    },

    resize: function () {},

    zoomIn: function () {
      // $(".magazine").addClass("zoom-in");
    },

    zoomOut: function () {
      setTimeout(function () {
        $(book).addClass("animated");
      }, 0);
      // $(book).addClass("animated");
      // resizeViewport();
    },
  },
});

// function writeOffsetLeft() {
//   console.log(book.getBoundingClientRect().left);
// }

function resizeViewport() {
  var width = $(window).width(),
    height = $(window).height();
  // options = $('.magazine').turn('options');

  // zoomContainer.style.position = "relative";
  // zoomContainer.style.left = "100px";
  // zoomContainer.style.top = "100px";

  $(zoomViewport)
    .css({
      width: width,
      height: height,
      // width: width - 200,
      // height: height - 200,
    })
    .zoom("resize");
}
resizeViewport();

/**
 * Zoom Functions
 */

$(zoomInBtn).on("click", zoomInBtnOnClick);

$(zoomOutBtn).on("click", zoomOutBtnOnClick);

// $(book).on("click", bookOnClick);

function zoomInBtnOnClick() {
  $(book).removeClass("animated");

  var center = {
    x: book.clientWidth / 2,
    y: book.clientHeight / 2,
  };

  $(zoomViewport).zoom("zoomIn", center);
}

function bookOnClick(event) {
  var click = {
    x: event.clientX,
    y: event.clientY,
  };

  console.log(click);

  $(zoomViewport).zoom("zoomIn", click);
}

function zoomOutBtnOnClick() {
  $(zoomViewport).zoom("zoomOut");
}

// $(book).click(function (e) {
//   var pos = {
//     x: e.offset().left,
//     y: e.offset().top,
//   };
//   console.log(pos);
//   // $(zoomViewport).zoom("zoomIn", pos);
// });

// $(book).click(function (e) {
//   var pos = {
//     x: e.pageX - $(this).offset().left,
//     y: e.pageY - $(this).offset().top,
//   };
//   console.log(pos);
//   $(zoomViewport).zoom("zoomIn", pos);
// });
