import { dom } from "../dom.js";

// To do
//
// dynamically populate pages?
// responsive sizing - started but still needs responsive zoom
// try out swipeLeft swipeRight zoom events? not sure of intended purpose...just console.log() them
//
// make prev/nextBtn and corners overly invisible on zoom
// thin magnifying glass icon
// use animationHandler over fadeOut/fadeIn ?
//
// fix bug where you click on zoom button and then click on book to zoom - basically debounce zooming on the book
// overlay modal + text + corner controls overlay showing
// use BEM method to hide prev/next Btn on zoom - https://getbem.com/introduction/
//
// code organizing!

// ---------------------------------------------------------------
// Init ----------------------------------------------------------
// ---------------------------------------------------------------

const turnDom = dom.nonlocalized.read_view.turn;

const animDuration = 500; // ms

const sizes = {
  page: {
    width: null,
    height: null,
    scale: null,
  },
  book: {
    width: null,
    height: null,
  },
  container: {
    width: null,
    height: null,
    offset: {
      x: null,
      y: null,
    },
  },
};

const flipbook = {
  init: function () {
    this.initDom();
    this.initTurn();
    this.initZoom();
  },

  initDom: function () {
    // console.log(document.getElementsByClassName("page"));
    turnDom.firstPage = document.getElementsByClassName("page")[2];
    turnDom.firstPageImg = turnDom.firstPage.getElementsByTagName("img")[0];

    // Sizes

    sizes.page.width = turnDom.firstPageImg.naturalWidth;
    sizes.page.height = turnDom.firstPageImg.naturalHeight;
    sizes.page.scale = 0.5;

    sizes.book.width = sizes.page.scale * sizes.page.width * 2;
    sizes.book.height = sizes.page.scale * sizes.page.height;

    setTurnContainerSizes();

    // Turn + Zoom setup

    // turnDom.book.style.left = -1 * sizes.page.scale * sizes.page.width + "px";
    // turnDom.book.style.top = -0.5 * sizes.page.scale * sizes.page.height + "px";
    turnDom.book.style.position = "relative";
    turnDom.book.style.width = sizes.book.width + "px";
    turnDom.book.style.height = sizes.book.height + "px";

    turnDom.nextBtn.style.height = sizes.book.height + "px";
    turnDom.prevBtn.style.height = sizes.book.height + "px";

    // turnDom.zoomContainer.style.position = "relative";
    turnDom.zoomContainer.style.left =
      0.5 * sizes.container.width + sizes.container.offset.x + "px"; // horizontal center within container
    turnDom.zoomContainer.style.top =
      0.5 * sizes.container.height + sizes.container.offset.y + "px"; // vertical center within container
    turnDom.zoomContainer.style.width = sizes.book.width + "px";
    turnDom.zoomContainer.style.height = sizes.book.height + "px";

    turnDom.zoomViewport.style.position = "absolute";
    turnDom.zoomViewport.style.left = "0px";
    turnDom.zoomViewport.style.top = "0px";

    // Controls overlay

    turnDom.cornerControlsOverlay.style.position = "absolute";
    turnDom.cornerControlsOverlay.style.left = "0px";
    turnDom.cornerControlsOverlay.style.top = "0px";
  },

  initTurn: function () {
    initializeTurnJS();
  },

  initZoom: function () {
    initializeZoom();
    resizeViewport();
  },

  reset: function () {
    // reset for idle timeout
    $(turnDom.book).turn("page", 2);
    $(turnDom.zoomViewport).zoom("zoomOut");
    fadeOut(turnDom.cornerControlsOverlay);
  },
};

// ---------------------------------------------------------------
// Turn ----------------------------------------------------------
// ---------------------------------------------------------------

function initializeTurnJS() {
  $(turnDom.book).turn({
    // acceleration: true,
    // autoCenter: false,
    width: sizes.page.scale * sizes.page.width * 2,
    height: sizes.page.scale * sizes.page.height,
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
        // disable next/prev buttons on first and last views
        setTurnControls(view);

        // if turned to first view peel top right corner
        if (compareArrays(view, getFirstView())) {
          $(this).turn("peel", "tr");
        }
      },
    },
  });

  turnDom.infoBtn.addEventListener("click", controlsToggleBtnOnClick);

  function controlsToggleBtnOnClick() {
    if (turnDom.cornerControlsOverlay.classList.contains("inactive")) {
      fadeIn(turnDom.cornerControlsOverlay);
    } else {
      fadeOut(turnDom.cornerControlsOverlay);
    }
  }

  // prev, next button listners

  $(turnDom.prevBtn).on("click", prevBtnOnClick);

  $(turnDom.nextBtn).on("click", nextBtnOnClick);

  function prevBtnOnClick() {
    $(turnDom.book).turn("previous");
  }

  function nextBtnOnClick() {
    $(turnDom.book).turn("next");
  }

  // disallow page turning to first and last pages

  const length = $(turnDom.book).turn("pages");

  $(turnDom.book).bind("start", function (e, data, c) {
    if (data.next == 1 || data.next == length) {
      e.preventDefault();
    }
  });

  $(turnDom.book).bind("turning", function (e, page, c) {
    if (page === 1 || page === length) {
      e.preventDefault();
    }
  });
}

// get first view and last view
// defined for case of allowing spreads only
function getFirstView() {
  return [2, 3];
}

function getLastView() {
  const pages = $(turnDom.book).turn("pages");
  const options = $(turnDom.book).turn("options");

  switch (options.display) {
    case "double":
      return [pages - 2, pages - 1];
    case "single":
      return [pages];
    default:
      return null;
  }
}

// disable next/prev buttons on first and last views
function setTurnControls(view) {
  if (compareArrays(view, getFirstView())) turnDom.prevBtn.disabled = true;
  else turnDom.prevBtn.disabled = false;

  if (compareArrays(view, getLastView())) turnDom.nextBtn.disabled = true;
  else turnDom.nextBtn.disabled = false;
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

function initializeZoom() {
  $(turnDom.zoomViewport).addClass("inactive-pointer");
  $(turnDom.book).addClass("active-pointer");

  $(turnDom.zoomViewport).zoom({
    flipbook: $(turnDom.book),
    max: 1 / sizes.page.scale,
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
        $(turnDom.book).removeClass("animated").addClass("zoom-in");
        $(turnDom.zoomViewport)
          .removeClass("inactive-pointer")
          .addClass("active-pointer");
      },

      zoomOut: function (event) {
        const view = $(turnDom.book).turn("view");
        setTurnControls(view);

        setTimeout(function () {
          $(turnDom.book).addClass("animated").removeClass("zoom-in");
          $(turnDom.zoomViewport)
            .removeClass("active-pointer")
            .addClass("inactive-pointer");
          resizeViewport();
        }, 0);
      },
    },
  });

  $(window)
    .resize(function () {
      resizeViewport();
    })
    .bind("orientationchange", function () {
      resizeViewport();
    });

  // Zoom listeners ------------------------------------------------

  if ($.isTouch) {
    $(turnDom.zoomViewport).bind("zoom.doubleTap", zoomTo);
  } else {
    $(turnDom.zoomViewport).bind("zoom.tap", zoomTo);
  }

  $(turnDom.zoomToggleBtn).on("click", zoomToggleBtnOnClick);
}

function rebindTapZoom() {
  // debounce tap zoom to prevent issues with Zoom library if retapped too quickly
  if ($.isTouch) {
    $(turnDom.zoomViewport).unbind("zoom.doubleTap", zoomTo);
    setTimeout(() => {
      $(turnDom.zoomViewport).bind("zoom.doubleTap", zoomTo);
    }, animDuration);
  } else {
    $(turnDom.zoomViewport).unbind("zoom.tap", zoomTo);
    setTimeout(() => {
      $(turnDom.zoomViewport).bind("zoom.tap", zoomTo);
    }, animDuration);
  }
}

// function zoomIn(event) {
//   if ($(turnDom.zoomViewport).zoom("value") === 1) {
//     disableTurnControls();
//     $(turnDom.zoomViewport).zoom("zoomIn");
//     debounce(event.currentTarget);

//     $(turnDom.zoomToggleIcon)
//       .removeClass("fa-search-plus")
//       .addClass("fa-search-minus");

//     fadeOut(turnDom.cornerControlsOverlay);
//   }
// }

// function zoomOut(event) {
//   if ($(turnDom.zoomViewport).zoom("value") !== 1) {
//     $(turnDom.zoomViewport).zoom("zoomOut");
//     debounce(event.currentTarget);

//     $(turnDom.zoomToggleIcon)
//       .removeClass("fa-search-minus")
//       .addClass("fa-search-plus");
//   }
// }

// function zoomInBtnOnClick(event) {
//   zoomIn(event);
// }

// function zoomOutBtnOnClick(event) {
//   zoomOut(event);
// }

function zoomToggleBtnOnClick(event) {
  if ($(turnDom.zoomViewport).zoom("value") === 1) {
    disableTurnControls();
    $(turnDom.zoomViewport).zoom("zoomIn");
    $(turnDom.zoomToggleIcon)
      .removeClass("fa-search-plus")
      .addClass("fa-search-minus");

    fadeOut(turnDom.cornerControlsOverlay);
  } else {
    $(turnDom.zoomViewport).zoom("zoomOut");
    $(turnDom.zoomToggleIcon)
      .removeClass("fa-search-minus")
      .addClass("fa-search-plus");
  }

  rebindTapZoom();
  debounce(event.currentTarget);
}

function resizeViewport() {
  const width = $(window).width();
  const height = $(window).height();

  turnDom.zoomViewport.style.position = "absolute";
  turnDom.zoomViewport.style.left = "0px";
  turnDom.zoomViewport.style.top = "0px";

  setTurnContainerSizes();

  turnDom.zoomContainer.style.left =
    0.5 * sizes.container.width + sizes.container.offset.x + "px"; // horizontal center within container
  turnDom.zoomContainer.style.top =
    0.5 * sizes.container.height + sizes.container.offset.y + "px"; // vertical center within container

  const options = $(turnDom.book).turn("options");

  $(turnDom.book).removeClass("animated");

  $(turnDom.zoomViewport)
    .css({
      width: width,
      height: height,
    })
    .zoom("resize");

  if ($(turnDom.book).turn("zoom") == 1) {
    var bound = calculateBound({
      width: options.width,
      height: options.height,
      boundWidth: Math.min(options.width, width),
      boundHeight: Math.min(options.height, height),
    });

    if (bound.width % 2 !== 0) bound.width -= 1;

    if (
      bound.width != $(turnDom.book).width() ||
      bound.height != $(turnDom.book).height()
    ) {
      $(turnDom.book).turn("size", bound.width, bound.height);

      if ($(turnDom.book).turn("page") == 1) $(turnDom.book).turn("peel", "br");

      $(".next-button").css({
        height: bound.height,
        backgroundPosition: "-38px " + (bound.height / 2 - 32 / 2) + "px",
      });
      $(".previous-button").css({
        height: bound.height,
        backgroundPosition: "-4px " + (bound.height / 2 - 32 / 2) + "px",
      });
    }

    $(turnDom.book).css({ top: -bound.height / 2, left: -bound.width / 2 });
  }

  $(turnDom.book).addClass("animated");

  positionOverlayCorners();
}

// Helper functions - UI geometry ----------------------------------

function setTurnContainerSizes() {
  let containerDOMRect = turnDom.turnContainer.getBoundingClientRect();
  sizes.container.width = containerDOMRect.width;
  sizes.container.height = containerDOMRect.height;
  sizes.container.offset.x = containerDOMRect.x;
  sizes.container.offset.y = containerDOMRect.y;
}

// get corners - not accurate until Turn.js has positioned book
// run within resizeViewport
function getCornerPositions() {
  const boundingClientRect = turnDom.book.getBoundingClientRect();

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

  return corners;
}

function positionOverlayCorners() {
  const corners = getCornerPositions();

  const width = turnDom.swipeTopLeft.clientWidth;
  const height = turnDom.swipeTopLeft.clientHeight;

  turnDom.swipeTopLeft.style.left = corners.tl.x - width / 2 + "px";
  turnDom.swipeTopLeft.style.top = corners.tl.y - height / 2 + "px";

  turnDom.swipeTopRight.style.left = corners.tr.x - width / 2 + "px";
  turnDom.swipeTopRight.style.top = corners.tr.y - height / 2 + "px";

  turnDom.swipeBottomLeft.style.left = corners.bl.x - width / 2 + "px";
  turnDom.swipeBottomLeft.style.top = corners.bl.y - height / 2 + "px";

  turnDom.swipeBottomRight.style.left = corners.br.x - width / 2 + "px";
  turnDom.swipeBottomRight.style.top = corners.br.y - height / 2 + "px";
}

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

// Helper functions ------------------------------------------------

function zoomTo(event) {
  setTimeout(function () {
    rebindTapZoom(); // debounce zoomViewport tap

    if ($(turnDom.zoomViewport).zoom("value") === 1) {
      disableTurnControls();
      $(turnDom.zoomViewport).zoom("zoomIn", event); // passing event zooms to location clicked
      $(turnDom.zoomToggleIcon)
        .removeClass("fa-search-plus")
        .addClass("fa-search-minus");
      fadeOut(turnDom.cornerControlsOverlay);
    } else {
      $(turnDom.zoomViewport).zoom("zoomOut");
      $(turnDom.zoomToggleIcon)
        .removeClass("fa-search-minus")
        .addClass("fa-search-plus");
    }
  }, 1);
}

function disableTurnControls() {
  turnDom.prevBtn.disabled = true;
  turnDom.nextBtn.disabled = true;
}

function debounce(btn) {
  btn.disabled = true;
  setTimeout(enable, animDuration, btn);
}

function enable(btn) {
  btn.disabled = false;
}

function fadeIn(element) {
  element.classList.remove("inactive");
  element.classList.add("active");
}

function fadeOut(element) {
  element.classList.remove("active");
  element.classList.add("inactive");
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

export { flipbook };
