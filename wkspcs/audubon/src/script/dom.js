const dom = {
  // Fade Between Views Overlay
  fadeBetweenViewsOverlay: document.getElementById(
    "fade-between-views-overlay"
  ),

  // Timeout Modal
  timeoutModal: document.getElementById("timeout-modal"),
  timeoutModalTapToContinueOverlay: document.getElementById(
    "timeout-modal-tap-to-continue-overlay"
  ),

  enStillViewing: document.getElementById("en-still-viewing"),
  esStillViewing: document.getElementById("es-still-viewing"),
  enTouchToContinue: document.getElementById("en-touch-to-continue"),
  esTouchToContinue: document.getElementById("es-touch-to-continue"),
  timeoutCountdownText: document.getElementById("timeout-countdown-text"),

  // Attract View
  attractView: document.getElementById("attract-view"),
  attractVideo: document.getElementById("attract-video"),
  attractOverlay: document.getElementById("attract-overlay"),

  enAttractTitle: document.getElementById("en-attract-title"),
  esAttractTitle: document.getElementById("es-attract-title"),

  enAttractTouchToBegin: document.getElementById("en-attract-touch-to-begin"),
  esAttractTouchToBegin: document.getElementById("es-attract-touch-to-begin"),

  // Main Menu View
  mainMenuView: document.getElementById("main-menu-view"),
  mainMenuWatchBtn: document.getElementById("main-menu-watch-button"),
  mainMenuReadBtn: document.getElementById("main-menu-read-button"),
  mainMenuBackBtn: document.getElementById("main-menu-back-button"),
  mainMenuToggleLangBtn: document.getElementById(
    "main-menu-toggle-lang-button"
  ),

  enMainMenuWatch: document.getElementById("en-main-menu-watch"),
  esMainMenuWatch: document.getElementById("es-main-menu-watch"),

  enMainMenuRead: document.getElementById("en-main-menu-read"),
  esMainMenuRead: document.getElementById("es-main-menu-read"),

  enMainMenuBack: document.getElementById("en-main-menu-back"),
  esMainMenuBack: document.getElementById("es-main-menu-back"),

  enMainMenuToggleLang: document.getElementById("en-main-menu-toggle-lang"),
  esMainMenuToggleLang: document.getElementById("es-main-menu-toggle-lang"),

  // Watch Menu View
  watchMenuView: document.getElementById("watch-menu-view"),
  watchMenuBackButton: document.getElementById("watch-menu-back-button"),
  watchMenuToggleLangButton: document.getElementById(
    "watch-menu-toggle-lang-button"
  ),

  enWatchMenuTitle: document.getElementById("en-watch-menu-title"),
  enWatchMenuSubheading: document.getElementById("en-watch-menu-subheading"),

  esWatchMenuTitle: document.getElementById("es-watch-menu-title"),
  esWatchMenuSubheading: document.getElementById("es-watch-menu-subheading"),

  enWatchMenuBack: document.getElementById("en-watch-menu-back"),
  esWatchMenuBack: document.getElementById("es-watch-menu-back"),

  enWatchMenuToggleLang: document.getElementById("en-watch-menu-toggle-lang"),
  esWatchMenuToggleLang: document.getElementById("es-watch-menu-toggle-lang"),

  //// Watch Menu View - Video Cards
  watchMenuVideoCardFlexbox: document.getElementById(
    "watch-menu-video-card-flexbox"
  ),
  watchMenuVideoCardPrototype: document.getElementById("video-card-prototype"),
  enWatchMenuVideoCardPrototype: document.getElementById(
    "en-video-card-prototype"
  ),
  esWatchMenuVideoCardPrototype: document.getElementById(
    "es-video-card-prototype"
  ),

  // Video Player View
  videoPlayerView: document.getElementById("video-player-view"),
  videoPlayerControls: document.getElementById("video-player-controls"),
  videoPlayerReturnHomeBtn: document.getElementById(
    "video-player-return-home-btn"
  ),
  videoPlayerPlaybackControls: document.getElementById(
    "video-player-playback-controls"
  ),
  videoPlayerPlayPauseBtn: document.getElementById(
    "video-player-play-pause-btn"
  ),
  videoPlayerPlayPauseBtnIcon: document.getElementById(
    "video-player-play-pause-btn-icon"
  ),
  videoPlayerSeekBar: document.getElementById("video-player-seek-bar"),
  videoPlayerVideo: document.getElementById("video-player-video"),

  enVideoPlayerReturnHomeBtnTxt: document.getElementById(
    "en-video-player-return-home-btn-txt"
  ),
  esVideoPlayerReturnHomeBtnTxt: document.getElementById(
    "es-video-player-return-home-btn-txt"
  ),

  // Read View
  readView: document.getElementById("read-view"),
  readViewBackButton: document.getElementById("read-view-back-button"),
  readViewToggleLangButton: document.getElementById(
    "read-view-toggle-lang-button"
  ),

  enReadViewBack: document.getElementById("en-read-view-back"),
  esReadViewBack: document.getElementById("es-read-view-back"),

  enReadViewToggleLang: document.getElementById("en-read-view-toggle-lang"),
  esReadViewToggleLang: document.getElementById("es-read-view-toggle-lang"),

  // Read View - Turn.js
  book: {
    beforeBook: document.getElementById("before-book"),
    bookContainer: document.getElementById("book-container"),
    afterBook: document.getElementById("after-book"),

    book: document.getElementById("book"),
    // firstPage
    // firstPageImg
    // populated in flipbook-spreads-only.js
    // firstPage: document.getElementsByClassName("page")[2],
    // firstPageImg: this.book.firstPage.getElementsByTagName("img")[0],

    nextBtn: document.getElementById("next-button"),
    prevBtn: document.getElementById("previous-button"),

    infoBtn: document.getElementById("read-view-info-button"),
    zoomToggleBtn: document.getElementById("read-view-toggle-zoom-button"),

    cornerControlsOverlay: document.getElementById("corner-controls-overlay"),
    swipeTopLeft: document.getElementById("swipe-tl"),
    swipeTopRight: document.getElementById("swipe-tr"),
    swipeBottomLeft: document.getElementById("swipe-bl"),
    swipeBottomRight: document.getElementById("swipe-br"),

    zoomViewport: document.getElementById("zoom-viewport"),
    zoomContainer: document.getElementById("zoom-container"),
  },
};

export { dom };
