import { dom } from "./dom.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { views } from "./initialize-views.js";
import { setupIdleTimer } from "./idle-timer-home.js";

function removeAttractView() {
  UIViewController.setView(views.mainMenu);

  // Pause the attract video
  dom.attractVideo.pause();

  // Remove the attract video
  // dom.attractVideo.remove();

  // Start the idle timer
  setupIdleTimer();
}

function attractViewInit() {
  dom.attractOverlay.addEventListener("click", removeAttractView);
}

// Exported to fetch script because depends on fetching of videopath from content.json
function createAttractLoop(videopath) {
  //apply the videopath arg to a source element's src tag within the video element
  dom.attractVideo.insertAdjacentHTML(
    "afterbegin",
    '<source id="attract-video-source" src="' +
      videopath +
      '" type="video/mp4">'
  );

  // Set video to loop playback, mute audio, and play
  dom.attractVideo.loop = true;
  dom.attractVideo.muted = true;
  dom.attractVideo.play();
}

export { attractViewInit, createAttractLoop };
