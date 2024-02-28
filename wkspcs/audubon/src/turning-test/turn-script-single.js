// import { interactionEvents } from "./interaction-events.js";

// interactionEvents.init();
// console.log(
//   interactionEvents.clickEvent,
//   interactionEvents.pressDownEvent,
//   interactionEvents.releaseEvent
// );

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const zoomInBtn = document.getElementById("zoom-in-btn");
const zoomOutBtn = document.getElementById("zoom-out-btn");

const book = document.getElementById("book");
const firstPage = document.getElementsByClassName("page")[0];
const firstPageImg = firstPage.getElementsByTagName("img")[0];

const pageWidth = firstPageImg.naturalWidth;
const pageHeight = firstPageImg.naturalHeight;
const pageScale = 1.0;

$(book).turn({
  // acceleration: true,
  // autoCenter: true,
  gradients: false,
  width: pageScale * pageWidth,
  height: pageScale * pageHeight,
  display: "single",
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

const zoomViewport = document.getElementById("zoom-viewport");
const zoomContainer = document.getElementById("zoom-container");

zoomContainer.style.width = pageScale * pageWidth + "px";
zoomContainer.style.height = pageScale * pageHeight + "px";

book.style.left = (-1 * pageScale * pageWidth) / 2 + "px";
book.style.top = (-1 * pageScale * pageHeight) / 2 + "px";
book.style.position = "relative";
book.style.width = pageScale * pageWidth + "px";
book.style.height = pageScale * pageHeight + "px";

$(zoomViewport).zoom({
  flipbook: $(book),
  max: 2,
  duration: 500,
  inclination: 500,
  when: {
    tap: function (event) {
      if ($(this).zoom("value") == 1) {
        $(book).removeClass("animated");

        let tap = {
          x: event.clientX,
          y: event.clientY,
        };

        $(this).zoom("zoomIn", tap);
      } else {
        $(this).zoom("zoomOut");
      }
    },

    resize: function () {},

    zoomIn: function () {
      // $(".magazine").addClass("zoom-in");
    },

    zoomOut: function () {
      setTimeout(function () {
        $(book).addClass("animated");
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

$(zoomInBtn).on("click", zoomInBtnOnClick);

$(zoomOutBtn).on("click", zoomOutBtnOnClick);

function zoomInBtnOnClick() {
  $(book).removeClass("animated");

  let center = {
    x: book.clientWidth / 4,
    y: book.clientHeight / 2,
  };

  $(zoomViewport).zoom("zoomIn", center);
}

function zoomOutBtnOnClick() {
  $(zoomViewport).zoom("zoomOut");
}
