// To do
// write a function to get first and last views from pages
// dynamically populate pages?
// responsive sizing
// get corner positions -> create overlay makers
//
// footer buttons
// modal
// put within larger app, UIViewController

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

      if (page === 2 || page === 3) {
        $(this).turn("peel", "tr");
      }
    },
  },
});

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
  if (compareArrays(view, [2, 3])) prevBtn.disabled = true;
  else prevBtn.disabled = false;

  if (compareArrays(view, [8, 9])) nextBtn.disabled = true;
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

function resizeViewport() {
  var width = $(window).width(),
    height = $(window).height();
  // options = $('.magazine').turn('options');

  // $(book).removeClass("animated");

  $(zoomViewport)
    .css({
      width: width,
      height: height,
    })
    .zoom("resize");

  // $(book).addClass("animated");
}
resizeViewport();

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
