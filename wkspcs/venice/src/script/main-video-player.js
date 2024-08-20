import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { domVars } from "./dom.js";
import { interactionEvents } from "./interaction-events.js";
import { attractView } from "./attract-view.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { idleTimer } from "./idle-timer-tier-1.js";

const mainVideoPlayer = {
  // Video path is defined in "./apply-content-ui.js"

  // Choose the video player volume // 100%
  videoPlayerVolume: 1.0,

  init: function () {
    const playVideoFunctions = this.play.bind(this);
    const pauseVideoFunctions = this.pause.bind(this);
    const timeFadeOut = this.delayFadeOutControls.bind(this);
    const timer = this.timerId;
    const pageReset = this.pageReset.bind(this);

    // Set the audio volume
    domVars.mainVideoPlayer.volume = this.videoPlayerVolume;

    // Fade out controls initially
    //fadeOut(domVars.controls);
    //fadeOut(domVars.returnHomeBtn);

    // Navigate back to home on video end
    domVars.mainVideoPlayer.addEventListener("ended", pageReset);

    // Navigate back to home on domVars.returnHomeBtn click
    domVars.returnHomeBtn.addEventListener(
      interactionEvents.clickEvent,
      pageReset
    );

    // Display domVars.controls on user interaction with domVars.controlsParent
    document.body.addEventListener(
      interactionEvents.clickEvent,
      function (event) {
        clearTimeout(timer);
        if (
          domVars.controlBar.contains(event.target) ||
          domVars.returnHomeBtn.contains(event.target) ||
          domVars.playPauseBtn.contains(event.target)
        ) {
          timeFadeOut();
        } else if (domVars.controlsParent.contains(event.target)) {
          if (domVars.controls.classList.contains("invisible")) {
            fadeIn(domVars.controls);
            fadeIn(domVars.returnHomeBtn);
            timeFadeOut();
          } else {
            fadeOut(domVars.controls);
          }
        }
      }
    );

    // Play and pause button listener
    domVars.playPauseBtn.addEventListener(
      interactionEvents.clickEvent,
      function () {
        if (domVars.mainVideoPlayer.paused == true) {
          playVideoFunctions();
          fadeOut(domVars.returnHomeBtn);
        } else {
          pauseVideoFunctions();
          fadeIn(domVars.returnHomeBtn);
        }
      }
    );

    // domVars.scrubBar listeners
    domVars.scrubBar.addEventListener("input", function () {
      let time =
        domVars.mainVideoPlayer.duration * (domVars.scrubBar.value / 100);
      domVars.mainVideoPlayer.currentTime = time;
      timeFadeOut(); // keep the controls visible while scrubbing
    });

    domVars.scrubBar.addEventListener(
      interactionEvents.pressDownEvent,
      pauseVideoFunctions
    );

    domVars.scrubBar.addEventListener(
      interactionEvents.releaseEvent,
      playVideoFunctions
    );
  },

  play: function () {
    domVars.mainVideoPlayer.play();
    this.videoIntervalId = setInterval(this.updateScrubBar, 25);
    domVars.playPauseBtnIcon.classList.add("fa-pause");
    domVars.playPauseBtnIcon.classList.remove("fa-play");
    idleTimer.remove();
  },

  pause: function () {
    domVars.mainVideoPlayer.pause();
    clearInterval(this.videoIntervalId);
    domVars.playPauseBtnIcon.classList.add("fa-play");
    domVars.playPauseBtnIcon.classList.remove("fa-pause");
    idleTimer.setup();
  },

  // holds reference to a setInterval ID that runs updateScrubBar
  videoIntervalId: null,

  updateScrubBar: function () {
    let value =
      (100 / domVars.mainVideoPlayer.duration) *
      domVars.mainVideoPlayer.currentTime;
    domVars.scrubBar.value = value;
  },

  // Display domVars.controls for 5 seconds on page load then fade
  timerId: null,
  timeVisible: 5000,

  delayFadeOutControls: function () {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(function () {
      fadeOut(domVars.controls);
    }, this.timeVisible);
  },

  pageReset: function () {
    domVars.mainVideoPlayer.pause();

    idleTimer.remove();

    fadeBetweenViews(domVars.mainVideoView, domVars.attractView);

    setTimeout(() => {
      attractView.play();
    }, 150);

    setTimeout(() => {
      domVars.mainVideoPlayer.currentTime = 0;
      domVars.scrubBar.value = 0;
      domVars.playPauseBtnIcon.classList.remove("fa-pause");
      domVars.playPauseBtnIcon.classList.add("fa-play");
    }, 300);
  },
};

export { mainVideoPlayer };
