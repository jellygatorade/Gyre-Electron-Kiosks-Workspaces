import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { domVars } from "./dom.js";
import { interactionEvents } from "./interaction-events.js";
import { mainVideoPlayer } from "./main-video-player.js";

const attractView = {
  init: function () {
    const transitionToMain = this.transitionToMain.bind(this);

    domVars.attractOverlay.addEventListener(
      interactionEvents.clickEvent,
      transitionToMain
    );

    this.createAttractLoop(); // requires videopath to be placed first in "./apply-content-ui.js"
  },

  transitionToMain: function () {
    fadeBetweenViews(domVars.attractView, domVars.mainVideoView);

    // Ensure the video player controls are initially visible
    fadeIn(domVars.returnHomeBtn);
    fadeIn(domVars.controls);

    setTimeout(() => {
      domVars.attractVideoPlayer.pause();
    }, 150);

    setTimeout(() => {
      mainVideoPlayer.play();
      mainVideoPlayer.delayFadeOutControls();
    }, 300);
  },

  createAttractLoop: function () {
    // Set video to loop playback, mute audio, and play
    domVars.attractVideoPlayer.loop = true;
    domVars.attractVideoPlayer.muted = true;
    domVars.attractVideoPlayer.play();
  },

  play: function () {
    domVars.attractVideoPlayer.play();
  },
};

export { attractView };
