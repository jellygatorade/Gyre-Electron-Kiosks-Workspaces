import { dom } from "./dom.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { animationHandler } from "./ui-macro-state/animation-handler.js";
import { views } from "./initialize-views.js";
import { setupIdleTimer, removeIdleTimer } from "./idle-timer-home.js";

// Set the video player volume
const videoPlayerVolume = 0.5; // 50%

function playVideo(path) {
  // Remove the idle timeout from idle-timer-home.js
  removeIdleTimer();

  // call HTMLMediaElement.load() method to reset the <video> element to its initial state
  dom.videoPlayerVideo.load();

  // apply the videoPath variable to a source element's src tag within the video element
  // dom.videoPlayerVideo.insertAdjacentHTML(
  //   "afterbegin",
  //   '<source id="videoSource" src="' + path + '" type="video/mp4">'
  // );

  // apply the videoPath variable to a source element's src tag
  dom.videoPlayerVideo.firstElementChild.src = path;

  // Set video's volume level
  dom.videoPlayerVideo.volume = videoPlayerVolume;

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
  // fadeBetweenViews(dom.homeView, dom.videoPlayerView);
  UIViewController.setView(views.videoPlayer);

  //Define reset function to reset the page to 'home' status
  function pageReset() {
    pauseVideoFunctions();

    // fadeBetweenViews(dom.videoPlayerView, dom.homeView);
    UIViewController.setView(views.watchMenu);

    dom.videoPlayerVideo.currentTime = 0;
    dom.videoPlayerSeekBar.value = 0;

    dom.videoPlayerVideo.firstElementChild.src = "";

    animationHandler.fadeOut(dom.videoPlayerReturnHomeBtn);
    animationHandler.fadeOut(dom.videoPlayerControls);

    // Remove the assigned event listeners
    dom.videoPlayerView.removeEventListener(
      clickEvent,
      displayControlsUserInteraction
    );
    dom.videoPlayerPlayPauseBtn.removeEventListener(
      clickEvent,
      playPauseBtnAction
    );
    dom.videoPlayerVideo.removeEventListener("ended", pageReset);
    dom.videoPlayerReturnHomeBtn.removeEventListener(clickEvent, pageReset);
    dom.videoPlayerSeekBar.removeEventListener("input", seekBarInput);
    dom.videoPlayerSeekBar.removeEventListener(
      pressDownEvent,
      pauseVideoFunctions
    );
    dom.videoPlayerSeekBar.removeEventListener(
      releaseEvent,
      playVideoFunctions
    );

    // Remove data from videoInterval and timer
    videoInterval = null;
    timer = null;

    // Reinstate the idle timeout from idle-timer-home.js
    setupIdleTimer();
  }

  //Navigate back to home on video end
  dom.videoPlayerVideo.addEventListener("ended", pageReset);

  //Navigate back to home on returnHome click
  dom.videoPlayerReturnHomeBtn.addEventListener(clickEvent, pageReset);

  //Display controls for 5 seconds on page load then fade
  let timer;
  const timeVisible = 5000;

  function timeFadeOut() {
    timer = setTimeout(function () {
      animationHandler.fadeOut(dom.videoPlayerControls);
      animationHandler.fadeOut(dom.videoPlayerReturnHomeBtn);
      console.log("delayed fade execute");
    }, timeVisible);
  }

  timeFadeOut();

  // Display controls on user interaction with dom.videoPlayerView
  // dom.videoPlayerView equivalent to screenDiv in the original SpeedStick.mp4/Peruvian Vessel HTML5 video app
  // (takes up full viewport and is root node of all video player elements so all events will bubble to it unless stopped)
  dom.videoPlayerView.addEventListener(
    clickEvent,
    displayControlsUserInteraction
  );

  function displayControlsUserInteraction(event) {
    //console.log(event.target);
    clearTimeout(timer);
    if (
      dom.videoPlayerPlaybackControls.contains(event.target) ||
      dom.videoPlayerReturnHomeBtn.contains(event.target) ||
      dom.videoPlayerPlayPauseBtn.contains(event.target)
    ) {
      timeFadeOut();
      console.log("1");
      // add event.stopPropagation() here?
      //
      // dom.videoPlayerView equivalent to screenDiv in the original SpeedStick.mp4/Peruvian Vessel HTML5 video app
    } else if (dom.videoPlayerView.contains(event.target)) {
      //if (dom.videoPlayerControls.style.visibility == "hidden") {
      if (dom.videoPlayerControls.classList.contains("invisible")) {
        animationHandler.fadeIn(dom.videoPlayerControls);
        animationHandler.fadeIn(dom.videoPlayerReturnHomeBtn);
        timeFadeOut();
        console.log("2");
      } else {
        animationHandler.fadeOut(dom.videoPlayerControls);
        animationHandler.fadeOut(dom.videoPlayerReturnHomeBtn);
        console.log("3");
      }
    }
  }

  //define play video functions
  let videoInterval;
  function playVideoFunctions() {
    dom.videoPlayerVideo.play();
    videoInterval = setInterval(calcVideoProgressAndUpdateSeekBar, 25);
    dom.videoPlayerPlayPauseBtnIcon.classList.add("fa-pause");
    dom.videoPlayerPlayPauseBtnIcon.classList.remove("fa-play");
  }

  //define pause video functions
  function pauseVideoFunctions() {
    dom.videoPlayerVideo.pause();
    clearInterval(videoInterval);
    dom.videoPlayerPlayPauseBtnIcon.classList.add("fa-play");
    dom.videoPlayerPlayPauseBtnIcon.classList.remove("fa-pause");
  }

  //play and pause functions for playPause button
  dom.videoPlayerPlayPauseBtn.addEventListener(clickEvent, playPauseBtnAction);

  function playPauseBtnAction() {
    if (dom.videoPlayerVideo.paused == true) {
      playVideoFunctions();
      animationHandler.fadeOut(dom.videoPlayerReturnHomeBtn);
    } else {
      pauseVideoFunctions();
      animationHandler.fadeIn(dom.videoPlayerReturnHomeBtn);
    }
  }

  //functions for the seekBar
  function seekBarInput() {
    var time =
      dom.videoPlayerVideo.duration * (dom.videoPlayerSeekBar.value / 100);
    dom.videoPlayerVideo.currentTime = time;
  }

  dom.videoPlayerSeekBar.addEventListener("input", seekBarInput);

  dom.videoPlayerSeekBar.addEventListener(pressDownEvent, pauseVideoFunctions);

  dom.videoPlayerSeekBar.addEventListener(releaseEvent, playVideoFunctions);

  // seekBar function used with setInterval() during playVideoFunctions()
  function calcVideoProgressAndUpdateSeekBar() {
    var value =
      (100 / dom.videoPlayerVideo.duration) * dom.videoPlayerVideo.currentTime;
    dom.videoPlayerSeekBar.value = value;
  }

  // Begin playback
  playVideoFunctions();
  animationHandler.fadeIn(dom.videoPlayerControls);
  animationHandler.fadeIn(dom.videoPlayerReturnHomeBtn);
}

export { playVideo };
