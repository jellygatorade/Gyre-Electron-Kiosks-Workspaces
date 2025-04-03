import {
  attractView,
  attractVideo,
  attractOverlay,
  homeView,
} from "./global-vars-dom.js";
import { fadeIn, fadeOut } from "./fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { setupIdleTimer } from "./idle-timer-home.js";

function removeAttractView() {
  fadeBetweenViews(attractView, homeView);

  // Pause the attract video
  attractVideo.pause();

  // Remove the attract video
  attractVideo.remove();

  // Start the idle timer
  setupIdleTimer();
}

function attractViewInitFns() {
  attractOverlay.addEventListener("click", removeAttractView);
  //attractOverlay.addEventListener("touchstart", removeAttractView);
}

// Exported to fetch script because depends on fetching of videopath from content.json
function createAttractLoop(videopath) {
  //apply the videopath arg to a source element's src tag within the video element
  attractVideo.insertAdjacentHTML(
    "afterbegin",
    '<source id="attract-video-source" src="' +
      videopath +
      '" type="video/mp4">'
  );

  // Set video to loop playback, mute audio, and play
  attractVideo.loop = true;
  attractVideo.muted = true;
  attractVideo.play();
}

export { attractViewInitFns, createAttractLoop };
