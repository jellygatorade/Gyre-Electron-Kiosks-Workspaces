// To do
// x - write a function to get first and last views from pages
// x - get corner positions -> create overlay makers
// dynamically populate pages?
// responsive sizing - started but still needs responsive zoom
// try out swipeLeft swipeRight zoom events? not sure of intended purpose...just console.log() them
//
// code organizing!
//
// footer buttons
// modal
// put within larger app, UIViewController

// 3/11
// import important elements via dom.book
// create init functions that can be composed into one flipbook.init() that can be imported by script.js
// then fix UI fit

// const prevBtn = document.getElementById("prev-btn");
// const nextBtn = document.getElementById("next-btn");

const nextBtn = document.getElementById("next-button");
const prevBtn = document.getElementById("previous-button");

const zoomInBtn = document.getElementById("zoom-in-btn");
const zoomOutBtn = document.getElementById("zoom-out-btn");
const zoomToggleBtn = document.getElementById("zoom-toggle-btn");

const book = document.getElementById("book");
const firstPage = document.getElementsByClassName("page")[2];
const firstPageImg = firstPage.getElementsByTagName("img")[0];

const animDuration = 500; // ms

// ---------------------------------------------------------------
// Turn ----------------------------------------------------------
// ---------------------------------------------------------------

const pageWidth = firstPageImg.naturalWidth;
const pageHeight = firstPageImg.naturalHeight;
const pageScale = 0.6;

nextBtn.style.height = pageScale * pageHeight + "px";
prevBtn.style.height = pageScale * pageHeight + "px";

$(book).turn({
  // acceleration: true,
  // autoCenter: false,
  width: pageScale * pageWidth * 2,
  height: pageScale * pageHeight,
  display: "double",
  page: 2, // initialize open
  when: {
    //zooming
    //pressed
    //released
    //start
    //turning
    //turned
    //destroying

    turned: function (event, page, view) {
      setTurnControls(view);

      // $(this).turn('center');

      const currentView = $(book).turn("view");

      // if turned to first view
      if (compareArrays(currentView, getFirstView())) {
        $(this).turn("peel", "tr");
      }
    },
  },
});

// get first view and last view
// defined for case of allowing spreads only
function getFirstView() {
  return [2, 3];
}

function getLastView() {
  const pages = $(book).turn("pages");
  const options = $(book).turn("options");

  switch (options.display) {
    case "double":
      return [pages - 2, pages - 1];
    case "single":
      return [pages];
    default:
      return null;
  }
}

// console.log(`firstView is ${getFirstView()}`);
// console.log(`lastView is ${getLastView()}`);

// get corners - not accurate until Turn.js has positioned book
// does Turn.js give an initialized function ?
function getCornerPositions() {
  const boundingClientRect = book.getBoundingClientRect();

  // console.log(book.style.left);
  // console.log(book.style.top);

  const corners = {
    tl: { x: boundingClientRect.x, y: boundingClientRect.y },
    tr: {
      x: boundingClientRect.x + boundingClientRect.width,
      y: boundingClientRect.y,
    },
    bl: {
      x: boundingClientRect.x,
      y: boundingClientRect.y + boundingClientRect.height,
    },
    br: {
      x: boundingClientRect.x + boundingClientRect.width,
      y: boundingClientRect.y + boundingClientRect.height,
    },
  };

  // console.log(boundingClientRect);
  // console.log(corners);
  return corners;
}

const swipeTopLeft = document.getElementById("swipe-tl");
const swipeTopRight = document.getElementById("swipe-tr");
const swipeBottomLeft = document.getElementById("swipe-bl");
const swipeBottomRight = document.getElementById("swipe-br");

function positionOverlayCorners() {
  const corners = getCornerPositions();

  const width = swipeTopLeft.clientWidth;
  const height = swipeTopLeft.clientHeight;
  console.log(width);

  swipeTopLeft.style.left = corners.tl.x - width / 2 + "px";
  swipeTopLeft.style.top = corners.tl.y - height / 2 + "px";

  swipeTopRight.style.left = corners.tr.x - width / 2 + "px";
  swipeTopRight.style.top = corners.tr.y - height / 2 + "px";

  swipeBottomLeft.style.left = corners.bl.x - width / 2 + "px";
  swipeBottomLeft.style.top = corners.bl.y - height / 2 + "px";

  swipeBottomRight.style.left = corners.br.x - width / 2 + "px";
  swipeBottomRight.style.top = corners.br.y - height / 2 + "px";
}

// getCornerPositions();
// setTimeout(getCornerPositions, 1000);
// setTimeout(positionOverlayCorners, 1000);

const cornerControlsOverlay = document.getElementById(
  "corner-controls-overlay"
);
const controlsToggleBtn = document.getElementById("controls-toggle-btn");
let hidden = true;

// controlsToggleBtn.addEventListener("click", controlsToggleBtnOnClick);

function controlsToggleBtnOnClick() {
  if (hidden) {
    fadeIn(cornerControlsOverlay);
  } else {
    fadeOut(cornerControlsOverlay);
  }

  hidden = !hidden;
}

function fadeIn(element) {
  element.classList.remove("inactive");
  element.classList.add("active");
}

function fadeOut(element) {
  element.classList.remove("active");
  element.classList.add("inactive");
}

// prev, next button listners

$(prevBtn).on("click", prevBtnOnClick);

$(nextBtn).on("click", nextBtnOnClick);

function prevBtnOnClick() {
  $(book).turn("previous");
}

function nextBtnOnClick() {
  $(book).turn("next");
}

// disallow page turning to first and last pages

const length = $(book).turn("pages");

$(book).bind("start", function (e, data, c) {
  if (data.next == 1 || data.next == length) {
    e.preventDefault();
  }
});

$(book).bind("turning", function (e, page, c) {
  if (page === 1 || page === length) {
    e.preventDefault();
  }
});

// disable next/prev buttons on first and last views

function setTurnControls(view) {
  if (compareArrays(view, getFirstView())) prevBtn.disabled = true;
  else prevBtn.disabled = false;

  if (compareArrays(view, getLastView())) nextBtn.disabled = true;
  else nextBtn.disabled = false;
}

// ---------------------------------------------------------------
// Zoom
//
// Following
// How to get zoom working with turn.js
// https://stackoverflow.com/questions/17607337/how-to-get-zoom-working-with-turn-js
//
// See also
// http://www.turnjs.com/samples/magazine/
// https://github.com/blasten/turn.js/issues/603
// ---------------------------------------------------------------

// Zoom Setup ----------------------------------------------------

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
  duration: animDuration,
  when: {
    // tap
    // doubleTap
    // resize
    // zoomIn
    // zoomOut
    // swipeLeft
    // swipeRight

    zoomIn: function (event) {
      $(book).removeClass("animated").addClass("zoom-in");
    },

    zoomOut: function (event) {
      const view = $(book).turn("view");
      setTurnControls(view);

      setTimeout(function () {
        $(book).addClass("animated").removeClass("zoom-in");
        resizeViewport();
      }, 0);
    },
  },
});

//
// Calculate the width and height of a square within another square
// used within resizeViewport
function calculateBound(d) {
  var bound = { width: d.width, height: d.height };

  if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
    var rel = bound.width / bound.height;

    if (
      d.boundWidth / rel > d.boundHeight &&
      d.boundHeight * rel <= d.boundWidth
    ) {
      bound.width = Math.round(d.boundHeight * rel);
      bound.height = d.boundHeight;
    } else {
      bound.width = d.boundWidth;
      bound.height = Math.round(d.boundWidth / rel);
    }
  }

  return bound;
}
//

function resizeViewport() {
  var width = $(window).width(),
    height = $(window).height();
  options = $(book).turn("options");

  $(book).removeClass("animated");

  $(zoomViewport)
    .css({
      width: width,
      height: height,
    })
    .zoom("resize");

  if ($(book).turn("zoom") == 1) {
    var bound = calculateBound({
      width: options.width,
      height: options.height,
      boundWidth: Math.min(options.width, width),
      boundHeight: Math.min(options.height, height),
    });

    if (bound.width % 2 !== 0) bound.width -= 1;

    if (bound.width != $(book).width() || bound.height != $(book).height()) {
      $(book).turn("size", bound.width, bound.height);

      if ($(book).turn("page") == 1) $(book).turn("peel", "br");

      $(".next-button").css({
        height: bound.height,
        backgroundPosition: "-38px " + (bound.height / 2 - 32 / 2) + "px",
      });
      $(".previous-button").css({
        height: bound.height,
        backgroundPosition: "-4px " + (bound.height / 2 - 32 / 2) + "px",
      });
    }

    $(book).css({ top: -bound.height / 2, left: -bound.width / 2 });
  }

  $(book).addClass("animated");
}
// resizeViewport();

$(window)
  .resize(function () {
    resizeViewport();
  })
  .bind("orientationchange", function () {
    resizeViewport();
  });

// Zoom functions ------------------------------------------------

if ($.isTouch) {
  console.log("isTouch");
  $(zoomViewport).bind("zoom.doubleTap", zoomTo);
} else {
  console.log("!isTouch");
  $(zoomViewport).bind("zoom.tap", zoomTo);
}

$(zoomInBtn).on("click", zoomInBtnOnClick);
$(zoomOutBtn).on("click", zoomOutBtnOnClick);
$(zoomToggleBtn).on("click", zoomToggleBtnOnClick);

function zoomInBtnOnClick(event) {
  if ($(zoomViewport).zoom("value") === 1) {
    disableTurnControls();
    $(zoomViewport).zoom("zoomIn");
    debounce(event.currentTarget);
  }
}

function zoomOutBtnOnClick(event) {
  if ($(zoomViewport).zoom("value") !== 1) {
    $(zoomViewport).zoom("zoomOut");
    debounce(event.currentTarget);
  }
}

function zoomToggleBtnOnClick(event) {
  if ($(zoomViewport).zoom("value") === 1) {
    disableTurnControls();
    $(zoomViewport).zoom("zoomIn");
  } else {
    $(zoomViewport).zoom("zoomOut");
  }

  debounce(event.currentTarget);
}

// Helper functions ------------------------------------------------

function zoomTo(event) {
  setTimeout(function () {
    if ($(zoomViewport).zoom("value") === 1) {
      disableTurnControls();
      $(zoomViewport).zoom("zoomIn", event); // passing event zooms to location clicked
    } else {
      $(zoomViewport).zoom("zoomOut");
    }
  }, 1);
}

function disableTurnControls() {
  prevBtn.disabled = true;
  nextBtn.disabled = true;
}

function debounce(btn) {
  btn.disabled = true;
  setTimeout(enable, animDuration, btn);
}

function enable(btn) {
  btn.disabled = false;
}

function compareArrays(a, b) {
  if (a.length !== b.length) return false;
  else {
    // Comparing each element of your array
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
}
