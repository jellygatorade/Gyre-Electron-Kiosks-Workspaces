const dom = {
  // non-localized UI elements - views, buttons, etc
  nonlocalized: {
    // Fade Between Views Overlay
    fade_between_views_overlay: document.getElementById("fade-between-views-overlay"),

    // Timeout Modal
    timeout_modal: {
      modal: document.getElementById("timeout-modal"),
      tap_to_continue_overlay: document.getElementById("timeout-modal-tap-to-continue-overlay"),
      countdown_text: document.getElementById("timeout-countdown-text"),
    },

    // Attract View
    attract: {
      view: document.getElementById("attract-view"),
      video: document.getElementById("attract-video"),
      overlay: document.getElementById("attract-overlay"),
    },

    // Main Menu View
    main_menu: {
      view: document.getElementById("main-menu-view"),
      watch_btn: document.getElementById("main-menu-watch-button"),
      read_btn: document.getElementById("main-menu-read-button"),
      back_btn: document.getElementById("main-menu-back-button"),
      toggle_lang_btn: document.getElementById("main-menu-toggle-lang-button"),
    },

    // Watch Menu View
    watch_menu: {
      view: document.getElementById("watch-menu-view"),
      back_btn: document.getElementById("watch-menu-back-button"),
      toggle_lang_btn: document.getElementById("watch-menu-toggle-lang-button"),
      // Watch Menu View - Video Cards
      video_cards: {
        flexbox: document.getElementById("watch-menu-video-card-flexbox"),
        card_prototype: document.getElementById("video-card-prototype"),
      },
    },

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
      back_btn: document.getElementById("read-view-back-button"),
      toggle_lang_btn: document.getElementById("read-view-toggle-lang-button"),

      // Turn.js
      turn: {
        before_book: document.getElementById("before-book"),
        turn_container: document.getElementById("turn-container"),
        after_book: document.getElementById("after-book"),

        controls_overlay: document.getElementById("controls-overlay"),
        swipe_top_left: document.getElementById("swipe-tl"),
        swipe_top_right: document.getElementById("swipe-tr"),
        swipe_bottom_left: document.getElementById("swipe-bl"),
        swipe_bottom_right: document.getElementById("swipe-br"),

        book: document.getElementById("book"),
        // first_page, first_page_img - populated in flipbook-spreads-only.js

        next_btn: document.getElementById("next-button"),
        prev_btn: document.getElementById("previous-button"),

        info_btn: document.getElementById("read-view-info-button"),
        zoom_toggle_btn: document.getElementById("read-view-toggle-zoom-button"),
        zoom_toggle_icon: document.getElementById("read-view-toggle-zoom-icon"),

        zoom_viewport: document.getElementById("zoom-viewport"),
        zoom_container: document.getElementById("zoom-container"),
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
