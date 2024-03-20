const dom = {
  // Timeout Modal
  timeoutModal: document.getElementById("timeout-modal"),
  timeoutModalTapToContinueOverlay: document.getElementById("timeout-modal-tap-to-continue-overlay"),
  timeoutCountdownText: document.getElementById("timeout-countdown-text"),

  // Attract View
  attractView: document.getElementById("attract-view"),
  attractVideo: document.getElementById("attract-video"),
  attractOverlay: document.getElementById("attract-overlay"),

  // Main Menu View
  mainMenuView: document.getElementById("main-menu-view"),
  mainMenuWatchBtn: document.getElementById("main-menu-watch-button"),
  mainMenuReadBtn: document.getElementById("main-menu-read-button"),
  mainMenuBackBtn: document.getElementById("main-menu-back-button"),
  mainMenuToggleLangBtn: document.getElementById("main-menu-toggle-lang-button"),

  // Watch Menu View
  watchMenuView: document.getElementById("watch-menu-view"),
  watchMenuBackButton: document.getElementById("watch-menu-back-button"),
  watchMenuToggleLangButton: document.getElementById("watch-menu-toggle-lang-button"),

  //// Watch Menu View - Video Cards
  watchMenuVideoCardFlexbox: document.getElementById("watch-menu-video-card-flexbox"),
  watchMenuVideoCardPrototype: document.getElementById("video-card-prototype"),

  // non-localized UI elements - views, buttons, etc
  nonlocalized: {
    // Fade Between Views Overlay
    fade_between_views_overlay: document.getElementById("fade-between-views-overlay"),
    timeout_modal: {},
    attract: {},
    main_menu: {},
    watch_menu: {},

    // Video Player View
    video_player: {
      view: document.getElementById("video-player-view"),
      controls: document.getElementById("video-player-controls"),
      return_home_btn: document.getElementById("video-player-return-home-btn"),
      playback_controls: document.getElementById("video-player-playback-controls"),
      play_pause_btn: document.getElementById("video-player-play-pause-btn"),
      play_pause_btn_icon: document.getElementById("video-player-play-pause-btn-icon"),
      seek_bar: document.getElementById("video-player-seek-bar"),
      video: document.getElementById("video-player-video"),
    },

    // Read View
    read_view: {
      view: document.getElementById("read-view"),
      backBtn: document.getElementById("read-view-back-button"),
      toggleLangBtn: document.getElementById("read-view-toggle-lang-button"),

      // Turn.js
      turn: {
        beforeBook: document.getElementById("before-book"),
        turnContainer: document.getElementById("turn-container"),
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
        zoomToggleIcon: document.getElementById("read-view-toggle-zoom-icon"),

        cornerControlsOverlay: document.getElementById("corner-controls-overlay"),
        swipeTopLeft: document.getElementById("swipe-tl"),
        swipeTopRight: document.getElementById("swipe-tr"),
        swipeBottomLeft: document.getElementById("swipe-bl"),
        swipeBottomRight: document.getElementById("swipe-br"),

        zoomViewport: document.getElementById("zoom-viewport"),
        zoomContainer: document.getElementById("zoom-container"),
      },
    },
  },

  localized: {
    // ui prototypes to be copied
    prototypes: {
      en: {
        video_card: document.getElementById("en-video-card-prototype"),
      },
      es: {
        video_card: document.getElementById("es-video-card-prototype"),
      },
    },

    // localized strings matching content.json
    en: {
      timeout_modal: {
        still_viewing: document.getElementById("en-still-viewing"),
        touch_to_continue: document.getElementById("en-touch-to-continue"),
      },
      attract: {
        title: document.getElementById("en-attract-title"),
        touch_to_begin: document.getElementById("en-attract-touch-to-begin"),
      },
      main_menu: {
        title: document.getElementById("en-main-menu-title"),
        watch: document.getElementById("en-main-menu-watch"),
        read: document.getElementById("en-main-menu-read"),
        back: document.getElementById("en-main-menu-back"),
        toggle_lang: document.getElementById("en-main-menu-toggle-lang"),
      },
      watch_menu: {
        title: document.getElementById("en-watch-menu-title"),
        subheading: document.getElementById("en-watch-menu-subheading"),
        back: document.getElementById("en-watch-menu-back"),
        toggle_lang: document.getElementById("en-watch-menu-toggle-lang"),
      },
      video_player: {
        return_home: document.getElementById("en-video-player-return-home-btn-txt"),
      },
      read_view: {
        title: document.getElementById("en-read-view-title"),
        description: document.getElementById("en-read-view-description"),
        back: document.getElementById("en-read-view-back"),
        toggle_lang: document.getElementById("en-read-view-toggle-lang"),
      },
    },
    es: {
      timeout_modal: {
        still_viewing: document.getElementById("es-still-viewing"),
        touch_to_continue: document.getElementById("es-touch-to-continue"),
      },
      attract: {
        title: document.getElementById("es-attract-title"),
        touch_to_begin: document.getElementById("es-attract-touch-to-begin"),
      },
      main_menu: {
        title: document.getElementById("es-main-menu-title"),
        watch: document.getElementById("es-main-menu-watch"),
        read: document.getElementById("es-main-menu-read"),
        back: document.getElementById("es-main-menu-back"),
        toggle_lang: document.getElementById("es-main-menu-toggle-lang"),
      },
      watch_menu: {
        title: document.getElementById("es-watch-menu-title"),
        subheading: document.getElementById("es-watch-menu-subheading"),
        back: document.getElementById("es-watch-menu-back"),
        toggle_lang: document.getElementById("es-watch-menu-toggle-lang"),
      },
      video_player: {
        return_home: document.getElementById("es-video-player-return-home-btn-txt"),
      },
      read_view: {
        title: document.getElementById("es-read-view-title"),
        description: document.getElementById("es-read-view-description"),
        back: document.getElementById("es-read-view-back"),
        toggle_lang: document.getElementById("es-read-view-toggle-lang"),
      },
    },
  },
};

export { dom };
