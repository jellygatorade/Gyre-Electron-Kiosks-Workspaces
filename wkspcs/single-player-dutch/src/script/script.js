import { contentInitalizer } from "./fetch.js";
import { interactionEvents } from "./interaction-events.js";
import { attractView } from "./attract-view.js";
import { mainVideoPlayer } from "./main-video-player.js";
import { idleTimer } from "./idle-timer-tier-1.js";

window.onload = function () {
  contentInitalizer.fetch();
  interactionEvents.init();
  idleTimer.init();
  attractView.init();
  mainVideoPlayer.init();
};
