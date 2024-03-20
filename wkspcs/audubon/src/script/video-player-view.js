import { dom } from "./dom.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { animationHandler } from "./ui-macro-state/animation-handler.js";
import { views } from "./initialize-views.js";
import { idleTimer } from "./idle-timer/idle-timer-static-class.js";

const videoDom = dom.nonlocalized.video_player;
const volume = 0.5; // 50%

function playVideo(path) {
  // Remove the idle timeout
  idleTimer.remove();

  // call HTMLMediaElement.load() method to reset the <video> element to its initial state
  videoDom.video.load();

  // apply the videoPath variable to a source element's src tag within the video element
  // videoDom.video.insertAdjacentHTML(
  //   "afterbegin",
  //   '<source id="videoSource" src="' + path + '" type="video/mp4">'
  // );

  // apply the videoPath variable to a source element's src tag
  videoDom.video.firstElementChild.src = path;

  // Set video's volume level
  videoDom.video.volume = volume;

  //Define clickEvent variable so that buttons work on 'click' events in desktop browsers and on 'touchstart' events on touchscreens
  var clickEvent = (function () {
    if ("ontouchstart" in document.documentElement === true) return "touchstart";
    else return "click";
  })();

  var pressDownEvent = (function () {
    if ("ontouchstart" in document.documentElement === true) return "touchstart";
    else return "mousedown";
  })();

  var releaseEvent = (function () {
    if ("ontouchstart" in document.documentElement === true) return "touchend";
    else return "mouseup";
  })();

  //Make the video player view visible
  UIViewController.setView(views.videoPlayer);

  //Define reset function to reset the page to 'home' status
  function pageReset() {
    pauseVideoFunctions();

    UIViewController.setView(views.watchMenu);

    videoDom.video.currentTime = 0;
    videoDom.seek_bar.value = 0;

    videoDom.video.firstElementChild.src = "";

    animationHandler.fadeOut(videoDom.return_home_btn);
    animationHandler.fadeOut(videoDom.controls);

    // Remove the assigned event listeners
    videoDom.view.removeEventListener(clickEvent, displayControlsUserInteraction);
    videoDom.play_pause_btn.removeEventListener(clickEvent, playPauseBtnAction);
    videoDom.video.removeEventListener("ended", pageReset);
    videoDom.return_home_btn.removeEventListener(clickEvent, pageReset);
    videoDom.seek_bar.removeEventListener("input", seekBarInput);
    videoDom.seek_bar.removeEventListener(pressDownEvent, pauseVideoFunctions);
    videoDom.seek_bar.removeEventListener(releaseEvent, playVideoFunctions);

    // Remove data from videoInterval and timer
    videoInterval = null;
    timer = null;

    // Reinstate the idle timeout
    idleTimer.setup();
  }

  //Navigate back to home on video end
  videoDom.video.addEventListener("ended", pageReset);

  //Navigate back to home on returnHome click
  videoDom.return_home_btn.addEventListener(clickEvent, pageReset);

  //Display controls for 5 seconds on page load then fade
  let timer;
  const timeVisible = 5000;

  function timeFadeOut() {
    timer = setTimeout(function () {
      animationHandler.fadeOut(videoDom.controls);
      animationHandler.fadeOut(videoDom.return_home_btn);
      console.log("delayed fade execute");
    }, timeVisible);
  }

  timeFadeOut();

  // Display controls on user interaction with videoDom.view
  // videoDom.view equivalent to screenDiv in the original SpeedStick.mp4/Peruvian Vessel HTML5 video app
  // (takes up full viewport and is root node of all video player elements so all events will bubble to it unless stopped)
  videoDom.view.addEventListener(clickEvent, displayControlsUserInteraction);

  function displayControlsUserInteraction(event) {
    //console.log(event.target);
    clearTimeout(timer);
    if (
      videoDom.playback_controls.contains(event.target) ||
      videoDom.return_home_btn.contains(event.target) ||
      videoDom.play_pause_btn.contains(event.target)
    ) {
      timeFadeOut();
      console.log("1");
      // add event.stopPropagation() here?
      //
      // videoDom.view equivalent to screenDiv in the original SpeedStick.mp4/Peruvian Vessel HTML5 video app
    } else if (videoDom.view.contains(event.target)) {
      if (videoDom.controls.classList.contains("invisible")) {
        animationHandler.fadeIn(videoDom.controls);
        animationHandler.fadeIn(videoDom.return_home_btn);
        timeFadeOut();
        console.log("2");
      } else {
        animationHandler.fadeOut(videoDom.controls);
        animationHandler.fadeOut(videoDom.return_home_btn);
        console.log("3");
      }
    }
  }

  //define play video functions
  let videoInterval;
  function playVideoFunctions() {
    videoDom.video.play();
    videoInterval = setInterval(calcVideoProgressAndUpdateSeekBar, 25);
    videoDom.play_pause_btn_icon.classList.add("fa-pause");
    videoDom.play_pause_btn_icon.classList.remove("fa-play");
  }

  //define pause video functions
  function pauseVideoFunctions() {
    videoDom.video.pause();
    clearInterval(videoInterval);
    videoDom.play_pause_btn_icon.classList.add("fa-play");
    videoDom.play_pause_btn_icon.classList.remove("fa-pause");
  }

  //play and pause functions for playPause button
  videoDom.play_pause_btn.addEventListener(clickEvent, playPauseBtnAction);

  function playPauseBtnAction() {
    if (videoDom.video.paused == true) {
      playVideoFunctions();
      animationHandler.fadeOut(videoDom.return_home_btn);
    } else {
      pauseVideoFunctions();
      animationHandler.fadeIn(videoDom.return_home_btn);
    }
  }

  //functions for the seekBar
  function seekBarInput() {
    var time = videoDom.video.duration * (videoDom.seek_bar.value / 100);
    videoDom.video.currentTime = time;
  }

  videoDom.seek_bar.addEventListener("input", seekBarInput);

  videoDom.seek_bar.addEventListener(pressDownEvent, pauseVideoFunctions);

  videoDom.seek_bar.addEventListener(releaseEvent, playVideoFunctions);

  // seekBar function used with setInterval() during playVideoFunctions()
  function calcVideoProgressAndUpdateSeekBar() {
    var value = (100 / videoDom.video.duration) * videoDom.video.currentTime;
    videoDom.seek_bar.value = value;
  }

  // Begin playback
  playVideoFunctions();
  animationHandler.fadeIn(videoDom.controls);
  animationHandler.fadeIn(videoDom.return_home_btn);
}

export { playVideo };
