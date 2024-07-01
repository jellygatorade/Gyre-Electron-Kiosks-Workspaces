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
// ^ (this bug still exists 3/26) - zoom book then button while zooming
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
    turnDom.first_page = document.getElementsByClassName("page")[2];
    turnDom.first_page_img = turnDom.first_page.getElementsByTagName("img")[0];

    // Sizes

    sizes.page.width = turnDom.first_page_img.naturalWidth;
    sizes.page.height = turnDom.first_page_img.naturalHeight;
    sizes.page.scale = 0.28;

    sizes.book.width = sizes.page.scale * sizes.page.width * 2;
    sizes.book.height = sizes.page.scale * sizes.page.height;

    setTurnContainerSizes();

    // Turn + Zoom setup

    // turnDom.book.style.left = -1 * sizes.page.scale * sizes.page.width + "px";
    // turnDom.book.style.top = -0.5 * sizes.page.scale * sizes.page.height + "px";
    turnDom.book.style.position = "relative";
    turnDom.book.style.width = sizes.book.width + "px";
    turnDom.book.style.height = sizes.book.height + "px";

    turnDom.next_btn.style.height = sizes.book.height + "px";
    turnDom.prev_btn.style.height = sizes.book.height + "px";

    // turnDom.zoom_container.style.position = "relative";
    turnDom.zoom_container.style.left = 0.5 * sizes.container.width + sizes.container.offset.x + "px"; // horizontal center within container
    turnDom.zoom_container.style.top = 0.5 * sizes.container.height + sizes.container.offset.y + "px"; // vertical center within container
    turnDom.zoom_container.style.width = sizes.book.width + "px";
    turnDom.zoom_container.style.height = sizes.book.height + "px";

    turnDom.zoom_viewport.style.position = "absolute";
    turnDom.zoom_viewport.style.left = "0px";
    turnDom.zoom_viewport.style.top = "0px";

    // Controls overlay

    turnDom.controls_overlay.style.position = "absolute";
    turnDom.controls_overlay.style.left = "0px";
    turnDom.controls_overlay.style.top = "0px";
  },

  initTurn: function () {
    initializeTurnJS();
  },

  initZoom: function () {
    initializeZoom();
    setTimeout(resizeViewport, 500); // sizes.container.height gains some pixels in here somewhere, logSizes() to see, bug not worth investigating at the moment

    function logSizes() {
      console.log(sizes.page.height, sizes.book.height, sizes.container.height, sizes.container.offset.y);
    }
  },

  reset: function () {
    // reset on idle timeout, and on returning to previous view
    $(turnDom.zoom_viewport).zoom("zoomOut");
    fadeOut(turnDom.controls_overlay);

    turnDom.zoom_toggle_material_symbol.innerText = "zoom_in";

    setTimeout(() => {
      $(turnDom.book).turn("page", 2);
    }, animDuration + 50);
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

  turnDom.info_btn.addEventListener("click", controlsToggleBtnOnClick);

  function controlsToggleBtnOnClick() {
    if (turnDom.controls_overlay.classList.contains("inactive")) {
      fadeIn(turnDom.controls_overlay);
    } else {
      fadeOut(turnDom.controls_overlay);
    }
  }

  // prev, next button listners

  $(turnDom.prev_btn).on("click", prevBtnOnClick);

  $(turnDom.next_btn).on("click", nextBtnOnClick);

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
  if (compareArrays(view, getFirstView())) turnDom.prev_btn.disabled = true;
  else turnDom.prev_btn.disabled = false;

  if (compareArrays(view, getLastView())) turnDom.next_btn.disabled = true;
  else turnDom.next_btn.disabled = false;
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
  $(turnDom.zoom_viewport).addClass("inactive-pointer");
  $(turnDom.book).addClass("active-pointer");

  $(turnDom.zoom_viewport).zoom({
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
        $(turnDom.zoom_viewport).removeClass("inactive-pointer").addClass("active-pointer");
      },

      zoomOut: function (event) {
        const view = $(turnDom.book).turn("view");
        setTurnControls(view);

        setTimeout(function () {
          $(turnDom.book).addClass("animated").removeClass("zoom-in");
          $(turnDom.zoom_viewport).removeClass("active-pointer").addClass("inactive-pointer");
          $(turnDom.prev_btn).removeClass("previous-button-invisible");
          $(turnDom.next_btn).removeClass("next-button-invisible");
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
    $(turnDom.zoom_viewport).bind("zoom.doubleTap", zoomTo);
  } else {
    $(turnDom.zoom_viewport).bind("zoom.tap", zoomTo);
  }

  $(turnDom.zoom_toggle_btn).on("click", zoomToggleBtnOnClick);
}

function rebindTapZoom() {
  // debounce tap zoom to prevent issues with Zoom library if retapped too quickly
  if ($.isTouch) {
    $(turnDom.zoom_viewport).unbind("zoom.doubleTap", zoomTo);
    setTimeout(() => {
      $(turnDom.zoom_viewport).bind("zoom.doubleTap", zoomTo);
    }, animDuration);
  } else {
    $(turnDom.zoom_viewport).unbind("zoom.tap", zoomTo);
    setTimeout(() => {
      $(turnDom.zoom_viewport).bind("zoom.tap", zoomTo);
    }, animDuration);
  }
}

// function zoomIn(event) {
//   if ($(turnDom.zoom_viewport).zoom("value") === 1) {
//     hideTurnControls();
//     $(turnDom.zoom_viewport).zoom("zoomIn");
//     debounce(event.currentTarget);

//     $(turnDom.zoom_toggle_icon)
//       .removeClass("fa-search-plus")
//       .addClass("fa-search-minus");
//     turnDom.zoom_toggle_material_symbol.innerText = "zoom_out";

//     fadeOut(turnDom.controls_overlay);
//   }
// }

// function zoomOut(event) {
//   if ($(turnDom.zoom_viewport).zoom("value") !== 1) {
//     $(turnDom.zoom_viewport).zoom("zoomOut");
//     debounce(event.currentTarget);

//     $(turnDom.zoom_toggle_icon)
//       .removeClass("fa-search-minus")
//       .addClass("fa-search-plus");
//     turnDom.zoom_toggle_material_symbol.innerText = "zoom_in";
//   }
// }

// function zoomInBtnOnClick(event) {
//   zoomIn(event);
// }

// function zoomOutBtnOnClick(event) {
//   zoomOut(event);
// }

function zoomToggleBtnOnClick(event) {
  if ($(turnDom.zoom_viewport).zoom("value") === 1) {
    hideTurnControls();
    $(turnDom.zoom_viewport).zoom("zoomIn");
    $(turnDom.zoom_toggle_icon).removeClass("fa-search-plus").addClass("fa-search-minus");
    turnDom.zoom_toggle_material_symbol.innerText = "zoom_out";

    fadeOut(turnDom.controls_overlay);
  } else {
    $(turnDom.zoom_viewport).zoom("zoomOut");
    $(turnDom.zoom_toggle_icon).removeClass("fa-search-minus").addClass("fa-search-plus");
    turnDom.zoom_toggle_material_symbol.innerText = "zoom_in";
  }

  rebindTapZoom();
  debounce(event.currentTarget);
}

function resizeViewport() {
  const width = $(window).width();
  const height = $(window).height();

  turnDom.zoom_viewport.style.position = "absolute";
  turnDom.zoom_viewport.style.left = "0px";
  turnDom.zoom_viewport.style.top = "0px";

  setTurnContainerSizes();

  turnDom.zoom_container.style.left = 0.5 * sizes.container.width + sizes.container.offset.x + "px"; // horizontal center within container
  turnDom.zoom_container.style.top = 0.5 * sizes.container.height + sizes.container.offset.y + "px"; // vertical center within container

  const options = $(turnDom.book).turn("options");

  $(turnDom.book).removeClass("animated");

  $(turnDom.zoom_viewport)
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

    if (bound.width != $(turnDom.book).width() || bound.height != $(turnDom.book).height()) {
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
  let containerDOMRect = turnDom.turn_container.getBoundingClientRect();
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

  const width = turnDom.swipe_top_left.clientWidth;
  const height = turnDom.swipe_top_left.clientHeight;

  // For positioning directly on corner
  // turnDom.swipe_top_left.style.left = corners.tl.x - width / 2 + "px";
  // turnDom.swipe_top_left.style.top = corners.tl.y - height / 2 + "px";

  turnDom.swipe_top_left.style.left = corners.tl.x + "px";
  turnDom.swipe_top_left.style.top = corners.tl.y + "px";

  turnDom.swipe_top_right.style.left = corners.tr.x - width - 2 + "px";
  turnDom.swipe_top_right.style.top = corners.tr.y + "px";

  turnDom.swipe_bottom_left.style.left = corners.bl.x + "px";
  turnDom.swipe_bottom_left.style.top = corners.bl.y - height - 3 + "px";

  turnDom.swipe_bottom_right.style.left = corners.br.x - width - 2 + "px";
  turnDom.swipe_bottom_right.style.top = corners.br.y - height - 3 + "px";
}

// Calculate the width and height of a square within another square
// used within resizeViewport
function calculateBound(d) {
  var bound = { width: d.width, height: d.height };

  if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
    var rel = bound.width / bound.height;

    if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {
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

    if ($(turnDom.zoom_viewport).zoom("value") === 1) {
      hideTurnControls();
      $(turnDom.zoom_viewport).zoom("zoomIn", event); // passing event zooms to location clicked
      $(turnDom.zoom_toggle_icon).removeClass("fa-search-plus").addClass("fa-search-minus");
      turnDom.zoom_toggle_material_symbol.innerText = "zoom_out";

      fadeOut(turnDom.controls_overlay);
    } else {
      $(turnDom.zoom_viewport).zoom("zoomOut");
      $(turnDom.zoom_toggle_icon).removeClass("fa-search-minus").addClass("fa-search-plus");
      turnDom.zoom_toggle_material_symbol.innerText = "zoom_in";
    }
  }, 1);
}

function hideTurnControls() {
  // It would be ideal to keep controls disabled here but disabled style overrules the invisble style
  // This could affect accessibility but seems to be fine for now
  turnDom.prev_btn.disabled = false;
  turnDom.next_btn.disabled = false;
  $(turnDom.prev_btn).addClass("previous-button-invisible");
  $(turnDom.next_btn).addClass("next-button-invisible");
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
