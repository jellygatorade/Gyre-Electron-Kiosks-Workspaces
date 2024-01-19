import { contentInitalizer } from "./fetch.js";
import { interactionEvents } from "./interaction-events.js";
import { attractView } from "./attract-view.js";
import { mainVideoPlayer } from "./main-video-player.js";

window.onload = function () {
  contentInitalizer.fetch();
  interactionEvents.init();
  attractView.init();
  mainVideoPlayer.init();
};
