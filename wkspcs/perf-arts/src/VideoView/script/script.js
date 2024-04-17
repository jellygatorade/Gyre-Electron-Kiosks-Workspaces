import {
  placeInstructionText,
  createVideoViewAttractLoop,
  changeVideoView,
} from "./video-view-player.js";
import { applyLanguage } from "./language-switcher-video-view.js";

// Boolean used for not restarting the video view's attract loop if the selection view reloads due to inactivity
let firstAttractLoopStarted = false;

// Set up listener for attract loop path
// The attract loop path is sent from selection renderer via main renderer so that fetch only has to run once (in selection renderer)
// It is used here to set up the initial attract loop
window.electronAPI.onAttractLoopPathReceived((event, attractLoopPath) => {
  // False when the app first runs, true after
  if (!firstAttractLoopStarted) {
    createVideoViewAttractLoop(attractLoopPath);
    firstAttractLoopStarted = true;
  }
});

// Listener for instruction text
window.electronAPI.onInstructionTextStrReceived(
  (event, instructionalTextEnEsObj) => {
    placeInstructionText(instructionalTextEnEsObj);
  }
);

// Listener for language switching
window.electronAPI.onLangReceived((event, choice) => {
  applyLanguage(choice);
});

// Set up listener for onLaunchVideo
// videoPathsObj contains two keys - one for the video path to be played, and one for the path to the attract loop video - which will be reverted to on end of the selected video
window.electronAPI.onLaunchVideo((event, videoPathsObj) => {
  changeVideoView(videoPathsObj);
});
