import {
  attractView,
  attractVideo,
  attractOverlay,
} from "./global-vars-dom.js";
import { setupIdleTimer } from "./idle-timer-home.js";

function removeAttractView() {
  //attractView.style.display = "none";
  attractView.classList.add("hidden"); // Using tailwind

  // Pause the attract video
  attractVideo.pause();

  // Remove the attract video
  attractVideo.remove();

  // Start the idle timer
  //console.log("idle timer not set");
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
