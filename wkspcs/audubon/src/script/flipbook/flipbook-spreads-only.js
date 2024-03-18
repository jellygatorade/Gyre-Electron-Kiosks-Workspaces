import { dom } from "../dom.js";

// To do
//
// dynamically populate pages?
// responsive sizing - started but still needs responsive zoom
// try out swipeLeft swipeRight zoom events? not sure of intended purpose...just console.log() them
//
// make prev/nextBtn and corners overly invisible on zoom
// zoom out button shows on top of zoomViewport
// thin magnifying glass icon and toggle minus
//
// user animationHandler over fadeOut/fadeIn
//
// en/es title swapping
// overlay modal + text + corner controls overlay showing
//
// code organizing!

// ---------------------------------------------------------------
// Init ----------------------------------------------------------
// ---------------------------------------------------------------

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
    dom.book.firstPage = document.getElementsByClassName("page")[2];
    dom.book.firstPageImg = dom.book.firstPage.getElementsByTagName("img")[0];

    // Sizes

    sizes.page.width = dom.book.firstPageImg.naturalWidth;
    sizes.page.height = dom.book.firstPageImg.naturalHeight;
    sizes.page.scale = 0.5;

    sizes.book.width = sizes.page.scale * sizes.page.width * 2;
    sizes.book.height = sizes.page.scale * sizes.page.height;

    sizes.container.width =
      dom.book.bookContainer.getBoundingClientRect().width;
    sizes.container.height =
      dom.book.bookContainer.getBoundingClientRect().height;

    // Turn + Zoom setup

    dom.book.book.style.left = -1 * sizes.page.scale * sizes.page.width + "px";
    dom.book.book.style.top =
      (-1 * sizes.page.scale * sizes.page.height) / 2 + "px";
    dom.book.book.style.position = "relative";
    dom.book.book.style.width = sizes.book.width + "px";
    dom.book.book.style.height = sizes.book.height + "px";

    dom.book.nextBtn.style.height = sizes.book.height + "px";
    dom.book.prevBtn.style.height = sizes.book.height + "px";

    dom.book.zoomContainer.style.width = sizes.book.width + "px";
    dom.book.zoomContainer.style.height = sizes.book.height + "px";

    dom.book.zoomViewport.style.position = "absolute";
    dom.book.zoomViewport.style.left = "0px";
    dom.book.zoomViewport.style.top = "0px";

    // Controls overlay

    dom.book.cornerControlsOverlay.style.position = "absolute";
    dom.book.cornerControlsOverlay.style.left = "0px";
    dom.book.cornerControlsOverlay.style.top = "0px";
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
    $(dom.book.book).turn("page", 2);
    $(dom.book.zoomViewport).zoom("zoomOut");
  },
};

// ---------------------------------------------------------------
// Turn ----------------------------------------------------------
// ---------------------------------------------------------------

function initializeTurnJS() {
  $(dom.book.book).turn({
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
        setTurnControls(view);

        // $(this).turn('center');

        const currentView = $(dom.book.book).turn("view");

        // if turned to first view
        if (compareArrays(currentView, getFirstView())) {
          $(this).turn("peel", "tr");
        }
      },
    },
  });

  let hidden = true;

  dom.book.infoBtn.addEventListener("click", controlsToggleBtnOnClick);

  function controlsToggleBtnOnClick() {
    if (hidden) {
      fadeIn(dom.book.cornerControlsOverlay);
    } else {
      fadeOut(dom.book.cornerControlsOverlay);
    }

    hidden = !hidden;
  }

  // prev, next button listners

  $(dom.book.prevBtn).on("click", prevBtnOnClick);

  $(dom.book.nextBtn).on("click", nextBtnOnClick);

  function prevBtnOnClick() {
    $(dom.book.book).turn("previous");
  }

  function nextBtnOnClick() {
    $(dom.book.book).turn("next");
  }

  // disallow page turning to first and last pages

  const length = $(dom.book.book).turn("pages");

  $(dom.book.book).bind("start", function (e, data, c) {
    if (data.next == 1 || data.next == length) {
      e.preventDefault();
    }
  });

  $(dom.book.book).bind("turning", function (e, page, c) {
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
  const pages = $(dom.book.book).turn("pages");
  const options = $(dom.book.book).turn("options");

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
  if (compareArrays(view, getFirstView())) dom.book.prevBtn.disabled = true;
  else dom.book.prevBtn.disabled = false;

  if (compareArrays(view, getLastView())) dom.book.nextBtn.disabled = true;
  else dom.book.nextBtn.disabled = false;
}

// get corners - not accurate until Turn.js has positioned book
// run within resizeViewport
function getCornerPositions() {
  const boundingClientRect = dom.book.book.getBoundingClientRect();

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

  const width = dom.book.swipeTopLeft.clientWidth;
  const height = dom.book.swipeTopLeft.clientHeight;

  dom.book.swipeTopLeft.style.left = corners.tl.x - width / 2 + "px";
  dom.book.swipeTopLeft.style.top = corners.tl.y - height / 2 + "px";

  dom.book.swipeTopRight.style.left = corners.tr.x - width / 2 + "px";
  dom.book.swipeTopRight.style.top = corners.tr.y - height / 2 + "px";

  dom.book.swipeBottomLeft.style.left = corners.bl.x - width / 2 + "px";
  dom.book.swipeBottomLeft.style.top = corners.bl.y - height / 2 + "px";

  dom.book.swipeBottomRight.style.left = corners.br.x - width / 2 + "px";
  dom.book.swipeBottomRight.style.top = corners.br.y - height / 2 + "px";
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
  $(dom.book.zoomViewport).addClass("inactive-pointer");
  $(dom.book.book).addClass("active-pointer");

  $(dom.book.zoomViewport).zoom({
    flipbook: $(dom.book.book),
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
        $(dom.book.book).removeClass("animated").addClass("zoom-in");
        $(dom.book.zoomViewport)
          .removeClass("inactive-pointer")
          .addClass("active-pointer");
      },

      zoomOut: function (event) {
        const view = $(dom.book.book).turn("view");
        setTurnControls(view);

        setTimeout(function () {
          $(dom.book.book).addClass("animated").removeClass("zoom-in");
          $(dom.book.zoomViewport)
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

  // Zoom functions ------------------------------------------------

  if ($.isTouch) {
    console.log("isTouch");
    $(dom.book.zoomViewport).bind("zoom.doubleTap", zoomTo);
  } else {
    console.log("!isTouch");
    $(dom.book.zoomViewport).bind("zoom.tap", zoomTo);
  }

  // $(zoomInBtn).on("click", zoomInBtnOnClick);
  // $(zoomOutBtn).on("click", zoomOutBtnOnClick);
  $(dom.book.zoomToggleBtn).on("click", zoomToggleBtnOnClick);
}

function zoomIn(event) {
  if ($(dom.book.zoomViewport).zoom("value") === 1) {
    disableTurnControls();
    $(dom.book.zoomViewport).zoom("zoomIn");
    debounce(event.currentTarget);
  }
}

function zoomOut(event) {
  if ($(dom.book.zoomViewport).zoom("value") !== 1) {
    $(dom.book.zoomViewport).zoom("zoomOut");
    debounce(event.currentTarget);
  }
}

function zoomInBtnOnClick(event) {
  zoomIn(event);
}

function zoomOutBtnOnClick(event) {
  zoomOut(event);
}

function zoomToggleBtnOnClick(event) {
  if ($(dom.book.zoomViewport).zoom("value") === 1) {
    disableTurnControls();
    $(dom.book.zoomViewport).zoom("zoomIn");
  } else {
    $(dom.book.zoomViewport).zoom("zoomOut");
  }

  debounce(event.currentTarget);
}

function resizeViewport() {
  const width = $(window).width();
  const height = $(window).height();

  dom.book.zoomViewport.style.position = "absolute";
  dom.book.zoomViewport.style.left = "0px";
  dom.book.zoomViewport.style.top = "0px";

  // const width = sizes.container.width;
  // const height = sizes.container.height;
  const options = $(dom.book.book).turn("options");

  $(dom.book.book).removeClass("animated");

  $(dom.book.zoomViewport)
    .css({
      width: width,
      height: height,
    })
    .zoom("resize");

  if ($(dom.book.book).turn("zoom") == 1) {
    var bound = calculateBound({
      width: options.width,
      height: options.height,
      boundWidth: Math.min(options.width, width),
      boundHeight: Math.min(options.height, height),
    });

    if (bound.width % 2 !== 0) bound.width -= 1;

    if (
      bound.width != $(dom.book.book).width() ||
      bound.height != $(dom.book.book).height()
    ) {
      $(dom.book.book).turn("size", bound.width, bound.height);

      if ($(dom.book.book).turn("page") == 1)
        $(dom.book.book).turn("peel", "br");

      $(".next-button").css({
        height: bound.height,
        backgroundPosition: "-38px " + (bound.height / 2 - 32 / 2) + "px",
      });
      $(".previous-button").css({
        height: bound.height,
        backgroundPosition: "-4px " + (bound.height / 2 - 32 / 2) + "px",
      });
    }

    $(dom.book.book).css({ top: -bound.height / 2, left: -bound.width / 2 });
  }

  $(dom.book.book).addClass("animated");

  positionOverlayCorners();
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
    if ($(dom.book.zoomViewport).zoom("value") === 1) {
      disableTurnControls();
      $(dom.book.zoomViewport).zoom("zoomIn", event); // passing event zooms to location clicked
    } else {
      $(dom.book.zoomViewport).zoom("zoomOut");
    }
  }, 1);
}

function disableTurnControls() {
  dom.book.prevBtn.disabled = true;
  dom.book.nextBtn.disabled = true;
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
