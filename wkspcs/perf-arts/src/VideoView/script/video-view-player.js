import { domVars } from "./global-vars-dom.js";
import { fadeIn, fadeOut } from "../../common/script/fade-in-out-elements.js";

// Choose the video player volume
const videoPlayerVolume = 0.5; // 50%

function placeInstructionText(instructionalTextEnEsObj) {
  if (instructionalTextEnEsObj.en) {
    domVars.enVideoViewInstructionText.innerHTML = instructionalTextEnEsObj.en;
  }
  if (instructionalTextEnEsObj.es) {
    domVars.esVideoViewInstructionText.innerHTML = instructionalTextEnEsObj.es;
  }
}

function createVideoViewAttractLoop(videopath) {
  // Remove "ended" listener if present
  domVars.videoViewPlayer.removeEventListener("ended", onVideoEnd);

  // Apply the videopath arg to a source element's src tag within the video element
  domVars.videoViewPlayerSource.src = videopath;

  // Set video to loop playback, mute audio, load media, and play media
  domVars.videoViewPlayer.loop = true;
  domVars.videoViewPlayer.muted = true;
  domVars.videoViewPlayer.load(); // must load the media before playing it
  domVars.videoViewPlayer.play();
}

// Function to transition video player to a different video
function changeVideoView(videoPathsObj) {
  // Remove old video, fade out, pause, ensure loop and mute are not enabled.
  fadeOut(domVars.videoViewPlayer);
  fadeOut(domVars.videoViewInstructionTextParent);
  setTimeout(function () {
    domVars.videoViewPlayer.pause();
  }, 500);
  domVars.videoViewPlayer.loop = false;
  domVars.videoViewPlayer.muted = false;
  domVars.videoViewPlayer.volume = videoPlayerVolume;

  // Return to attract loop state on video end
  // This is how to pass arguments to addEventListener listener function
  // See https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
  domVars.videoViewPlayer.videoLoopRevertPath =
    videoPathsObj.videoLoopRevertPath;
  domVars.videoViewPlayer.addEventListener("ended", onVideoEnd);

  // Apply the new videopath arg to a source element's src tag within the video element
  domVars.videoViewPlayerSource.src = videoPathsObj.videoToPlayPath;

  // Load, fade in, and play the new video
  // Delay these for fade out / fade in transition effect
  setTimeout(function () {
    domVars.videoViewPlayer.load(); // must load the media before playing it
    fadeIn(domVars.videoViewPlayer);
    domVars.videoViewPlayer.play();
  }, 500);
}

// This is how to pass arguments to addEventListener listener function
// See https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
function onVideoEnd(event) {
  createVideoViewAttractLoop(event.currentTarget.videoLoopRevertPath);
  fadeIn(domVars.videoViewInstructionTextParent);
  window.electronAPI.sendVideoEnd("A video has ended.");
}

export { placeInstructionText, createVideoViewAttractLoop, changeVideoView };
