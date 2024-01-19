const domVars = {};

window.addEventListener("load", () => {
  // Fade between views overlay
  domVars.fadeBetweenViewsOverlay = document.getElementById(
    "fade-between-views-overlay"
  );

  // Attract View
  domVars.attractView = document.getElementById("attract-view");
  domVars.attractVideoPlayer = document.getElementById("attract-video");
  domVars.attractOverlay = document.getElementById("attract-overlay");
  domVars.attractTitle1 = document.getElementById("attract-title-1");
  domVars.attractTitle2 = document.getElementById("attract-title-2");
  domVars.attractTouchToBegin = document.getElementById(
    "attract-touch-to-begin"
  );

  // Main Video View
  domVars.mainVideoView = document.getElementById("main-video-view");
  domVars.mainVideoPlayer = document.getElementById("main-video-player");
  domVars.controlsParent = document.getElementById("controls-parent");
  domVars.controls = document.getElementById("controls");
  domVars.controlBar = document.getElementById("control-bar");
  domVars.playPauseBtn = document.getElementById("play-pause-button");
  domVars.playPauseBtnIcon = document.getElementById("play-pause-button-icon");
  domVars.scrubBar = document.getElementById("scrub-bar");
  domVars.returnHomeBtn = document.getElementById("return-home-button");
});

export { domVars };
