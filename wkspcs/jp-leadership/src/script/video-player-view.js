import {
  homeView,
  videoPlayerView,
  videoPlayerControls,
  videoPlayerReturnHomeBtn,
  videoPlayerPlaybackControls,
  videoPlayerPlayPauseBtn,
  videoPlayerPlayPauseBtnIcon,
  videoPlayerSeekBar,
  videoPlayerVideo,
} from "./global-vars-dom.js";

import { fadeIn, fadeOut } from "./fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";

import { setupIdleTimer, removeIdleTimer } from "./idle-timer-home.js";

// Set the video player volume
const videoPlayerVolume = 1.0; // 100%

function playVideo(path) {
  // Remove the idle timeout from idle-timer-home.js
  removeIdleTimer();

  // call HTMLMediaElement.load() method to reset the <video> element to its initial state
  videoPlayerVideo.load();

  // apply the videoPath variable to a source element's src tag within the video element
  // videoPlayerVideo.insertAdjacentHTML(
  //   "afterbegin",
  //   '<source id="videoSource" src="' + path + '" type="video/mp4">'
  // );

  // apply the videoPath variable to a source element's src tag
  videoPlayerVideo.firstElementChild.src = path;

  // Set video's volume level
  videoPlayerVideo.volume = videoPlayerVolume;

  //Define clickEvent variable so that buttons work on 'click' events in desktop browsers and on 'touchstart' events on touchscreens
  var clickEvent = (function () {
    if ("ontouchstart" in document.documentElement === true)
      return "touchstart";
    else return "click";
  })();

  var pressDownEvent = (function () {
    if ("ontouchstart" in document.documentElement === true)
      return "touchstart";
    else return "mousedown";
  })();

  var releaseEvent = (function () {
    if ("ontouchstart" in document.documentElement === true) return "touchend";
    else return "mouseup";
  })();

  //Make the video player view visible
  fadeBetweenViews(homeView, videoPlayerView);

  //Define reset function to reset the page to 'home' status
  function pageReset() {
    pauseVideoFunctions();

    fadeBetweenViews(videoPlayerView, homeView);

    videoPlayerVideo.currentTime = 0;
    videoPlayerSeekBar.value = 0;

    videoPlayerVideo.firstElementChild.src = "";

    fadeOut(videoPlayerReturnHomeBtn);
    fadeOut(videoPlayerControls);

    // Remove the assigned event listeners
    videoPlayerView.removeEventListener(
      clickEvent,
      displayControlsUserInteraction
    );
    videoPlayerPlayPauseBtn.removeEventListener(clickEvent, playPauseBtnAction);
    videoPlayerVideo.removeEventListener("ended", pageReset);
    videoPlayerReturnHomeBtn.removeEventListener(clickEvent, pageReset);
    videoPlayerSeekBar.removeEventListener("input", seekBarInput);
    videoPlayerSeekBar.removeEventListener(pressDownEvent, pauseVideoFunctions);
    videoPlayerSeekBar.removeEventListener(releaseEvent, playVideoFunctions);

    // Remove data from videoInterval and timer
    videoInterval = null;
    timer = null;

    // Reinstate the idle timeout from idle-timer-home.js
    setupIdleTimer();
  }

  //Navigate back to home on video end
  videoPlayerVideo.addEventListener("ended", pageReset);

  //Navigate back to home on returnHome click
  videoPlayerReturnHomeBtn.addEventListener(clickEvent, pageReset);

  //Display controls for 5 seconds on page load then fade
  let timer;
  const timeVisible = 5000;

  function timeFadeOut() {
    timer = setTimeout(function () {
      fadeOut(videoPlayerControls);
      fadeOut(videoPlayerReturnHomeBtn);
      console.log("delayed fade execute");
    }, timeVisible);
  }

  timeFadeOut();

  // Display controls on user interaction with videoPlayerView
  // videoPlayerView equivalent to screenDiv in the original SpeedStick.mp4/Peruvian Vessel HTML5 video app
  // (takes up full viewport and is root node of all video player elements so all events will bubble to it unless stopped)
  videoPlayerView.addEventListener(clickEvent, displayControlsUserInteraction);

  function displayControlsUserInteraction(event) {
    //console.log(event.target);
    clearTimeout(timer);
    if (
      videoPlayerPlaybackControls.contains(event.target) ||
      videoPlayerReturnHomeBtn.contains(event.target) ||
      videoPlayerPlayPauseBtn.contains(event.target)
    ) {
      timeFadeOut();
      console.log("1");
      // add event.stopPropagation() here?
      //
      // videoPlayerView equivalent to screenDiv in the original SpeedStick.mp4/Peruvian Vessel HTML5 video app
    } else if (videoPlayerView.contains(event.target)) {
      //if (videoPlayerControls.style.visibility == "hidden") {
      if (videoPlayerControls.classList.contains("invisible")) {
        fadeIn(videoPlayerControls);
        fadeIn(videoPlayerReturnHomeBtn);
        timeFadeOut();
        console.log("2");
      } else {
        fadeOut(videoPlayerControls);
        fadeOut(videoPlayerReturnHomeBtn);
        console.log("3");
      }
    }
  }

  //define play video functions
  let videoInterval;
  function playVideoFunctions() {
    videoPlayerVideo.play();
    videoInterval = setInterval(calcVideoProgressAndUpdateSeekBar, 25);
    videoPlayerPlayPauseBtnIcon.classList.add("fa-pause");
    videoPlayerPlayPauseBtnIcon.classList.remove("fa-play");
  }

  //define pause video functions
  function pauseVideoFunctions() {
    videoPlayerVideo.pause();
    clearInterval(videoInterval);
    videoPlayerPlayPauseBtnIcon.classList.add("fa-play");
    videoPlayerPlayPauseBtnIcon.classList.remove("fa-pause");
  }

  //play and pause functions for playPause button
  videoPlayerPlayPauseBtn.addEventListener(clickEvent, playPauseBtnAction);

  function playPauseBtnAction() {
    if (videoPlayerVideo.paused == true) {
      playVideoFunctions();
      fadeOut(videoPlayerReturnHomeBtn);
    } else {
      pauseVideoFunctions();
      fadeIn(videoPlayerReturnHomeBtn);
    }
  }

  //functions for the seekBar
  function seekBarInput() {
    var time = videoPlayerVideo.duration * (videoPlayerSeekBar.value / 100);
    videoPlayerVideo.currentTime = time;
  }

  videoPlayerSeekBar.addEventListener("input", seekBarInput);

  videoPlayerSeekBar.addEventListener(pressDownEvent, pauseVideoFunctions);

  videoPlayerSeekBar.addEventListener(releaseEvent, playVideoFunctions);

  // seekBar function used with setInterval() during playVideoFunctions()
  function calcVideoProgressAndUpdateSeekBar() {
    var value =
      (100 / videoPlayerVideo.duration) * videoPlayerVideo.currentTime;
    videoPlayerSeekBar.value = value;
  }

  // Begin playback
  playVideoFunctions();
  fadeIn(videoPlayerControls);
  fadeIn(videoPlayerReturnHomeBtn);
}

export { playVideo };
