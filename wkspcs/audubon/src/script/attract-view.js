import { dom } from "./dom.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { views } from "./initialize-views.js";
import { idleTimer } from "./idle-timer/idle-timer-static-class.js";

function returnToAttractView() {
  idleTimer.remove();
  dom.nonlocalized.attract.video.play();
  UIViewController.setView(views.attract);
}

function removeAttractView() {
  UIViewController.setView(views.read);

  // Pause the attract video
  dom.nonlocalized.attract.video.pause();

  // Remove the attract video
  // dom.nonlocalized.attract.video.remove();

  // Start the idle timer
  idleTimer.setup();
}

function attractViewInit() {
  dom.nonlocalized.attract.overlay.addEventListener("click", removeAttractView);
}

// Exported to fetch script because depends on fetching of videopath from content.json
function createAttractLoop(videopath) {
  //apply the videopath arg to a source element's src tag within the video element
  dom.nonlocalized.attract.video.insertAdjacentHTML("afterbegin", '<source id="attract-video-source" src="' + videopath + '" type="video/mp4">');

  // Set video to loop playback, mute audio, and play
  dom.nonlocalized.attract.video.loop = true;
  dom.nonlocalized.attract.video.muted = true;
  dom.nonlocalized.attract.video.play();
}

export { attractViewInit, createAttractLoop, returnToAttractView };
