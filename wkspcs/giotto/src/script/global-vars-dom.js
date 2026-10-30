// Fade Between Views Overlay
const fadeBetweenViewsOverlay = document.getElementById(
  "fade-between-views-overlay"
);

// Initialization Overlay
const initializationOverlay = document.getElementById(
  "initialization-overlay"
);

// Attract View
const attractView = document.getElementById("attract-view");
const attractVideo = document.getElementById("attract-video");
const attractOverlay = document.getElementById("attract-overlay");

const enAttractTitle = document.getElementById("en-attract-title");
const esAttractTitle = document.getElementById("es-attract-title");

const enAttractTouchToBegin = document.getElementById(
  "en-attract-touch-to-begin"
);

const esAttractTouchToBegin = document.getElementById(
  "es-attract-touch-to-begin"
);

// Home View
const homeView = document.getElementById("home-view");
const toggleLangButton = document.getElementById("toggle-lang-button");

const enHomeViewTitle = document.getElementById("en-home-view-title");
const enHomeViewSubheading = document.getElementById("en-home-view-subheading");
const enHomeViewCredit = document.getElementById("en-home-view-credit");

const esHomeViewTitle = document.getElementById("es-home-view-title");
const esHomeViewSubheading = document.getElementById("es-home-view-subheading");
const esHomeViewCredit = document.getElementById("es-home-view-credit");

//// Home View - Video Cards
const homeViewVideoCardFlexbox = document.getElementById(
  "home-view-video-card-flexbox"
);
const homeViewVideoCardPrototype = document.getElementById(
  "video-card-prototype"
);
const enHomeViewVideoCardPrototype = document.getElementById(
  "en-video-card-prototype"
);
const esHomeViewVideoCardPrototype = document.getElementById(
  "es-video-card-prototype"
);

// Video Player View
const videoPlayerView = document.getElementById("video-player-view");
const videoPlayerControls = document.getElementById("video-player-controls");
const videoPlayerReturnHomeBtn = document.getElementById(
  "video-player-return-home-btn"
);
const videoPlayerPlaybackControls = document.getElementById(
  "video-player-playback-controls"
);
const videoPlayerPlayPauseBtn = document.getElementById(
  "video-player-play-pause-btn"
);
const videoPlayerPlayPauseBtnIcon = document.getElementById(
  "video-player-play-pause-btn-icon"
);
const videoPlayerSeekBar = document.getElementById("video-player-seek-bar");
const videoPlayerVideo = document.getElementById("video-player-video");

const enVideoPlayerReturnHomeBtnTxt = document.getElementById(
  "en-video-player-return-home-btn-txt"
);
const esVideoPlayerReturnHomeBtnTxt = document.getElementById(
  "es-video-player-return-home-btn-txt"
);

export {
  // Fade Between Views Overlay
  fadeBetweenViewsOverlay,
  // Initialization Overlay
  initializationOverlay,
  // Attract View
  attractView,
  attractVideo,
  attractOverlay,
  enAttractTitle,
  esAttractTitle,
  enAttractTouchToBegin,
  esAttractTouchToBegin,
  // Home View
  homeView,
  toggleLangButton,
  enHomeViewTitle,
  enHomeViewSubheading,
  enHomeViewCredit,
  esHomeViewTitle,
  esHomeViewSubheading,
  esHomeViewCredit,
  //// Home View - Video Cards
  homeViewVideoCardFlexbox,
  homeViewVideoCardPrototype,
  enHomeViewVideoCardPrototype,
  esHomeViewVideoCardPrototype,
  // Video Player View
  videoPlayerView,
  videoPlayerControls,
  videoPlayerReturnHomeBtn,
  videoPlayerPlaybackControls,
  videoPlayerPlayPauseBtn,
  videoPlayerPlayPauseBtnIcon,
  videoPlayerSeekBar,
  videoPlayerVideo,
  enVideoPlayerReturnHomeBtnTxt,
  esVideoPlayerReturnHomeBtnTxt,
};
