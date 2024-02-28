const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const zoomInBtn = document.getElementById("zoom-in-btn");
const zoomOutBtn = document.getElementById("zoom-out-btn");

const book = document.getElementById("book");
const firstPage = document.getElementsByClassName("page")[2];
const firstPageImg = firstPage.getElementsByTagName("img")[0];

const pageWidth = firstPageImg.naturalWidth;
const pageHeight = firstPageImg.naturalHeight;
const pageScale = 0.5;

$(book).turn({
  // acceleration: true,
  // autoCenter: false,
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

const zoomViewport = document.getElementById("zoom-viewport");
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
  inclination: 500,
  when: {
    // tap: function (event) {
    //   if ($(this).zoom("value") == 1) {
    //     $(book).removeClass("animated");

    //     let tap = {
    //       x: event.clientX,
    //       y: event.clientY,
    //     };

    //     $(this).zoom("zoomIn", tap);
    //   } else {
    //     $(this).zoom("zoomOut");
    //   }
    // },

    // doubleTap: function (event) {
    //   if ($(this).zoom("value") == 1) {
    //     $(book).removeClass("animated");

    //     let tap = {
    //       x: event.clientX,
    //       y: event.clientY,
    //     };

    //     $(this).zoom("zoomIn", tap);
    //   } else {
    //     $(this).zoom("zoomOut");
    //   }
    // },

    resize: function () {},

    zoomIn: function () {
      // $(".magazine").addClass("zoom-in");
      $(book).removeClass("animated").addClass("zoom-in");
    },

    zoomOut: function () {
      // setTimeout(function () {
      //   $(book).addClass("animated");
      // }, 0);
      setTimeout(function () {
        $(book).addClass("animated").removeClass("zoom-in");
        resizeViewport();
      }, 0);
    },
  },
});

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

///////////////// Refactor here
$(zoomViewport).bind("zoom.doubleTap", zoomTo);

function zoomTo(event) {
  setTimeout(function () {
    if ($(zoomViewport).data().regionClicked) {
      $(zoomViewport).data().regionClicked = false;
    } else {
      if ($(zoomViewport).zoom("value") == 1) {
        $(zoomViewport).zoom("zoomIn", event);
      } else {
        $(zoomViewport).zoom("zoomOut");
      }
    }
  }, 1);
}
///////////////////

$(zoomInBtn).on("click", zoomInBtnOnClick);

$(zoomOutBtn).on("click", zoomOutBtnOnClick);

function zoomInBtnOnClick() {
  // $(book).removeClass("animated");

  let center = {
    x: book.clientWidth / 4,
    y: book.clientHeight / 2,
  };

  $(zoomViewport).zoom("zoomIn", center);
}

function zoomOutBtnOnClick() {
  $(zoomViewport).zoom("zoomOut");
}
