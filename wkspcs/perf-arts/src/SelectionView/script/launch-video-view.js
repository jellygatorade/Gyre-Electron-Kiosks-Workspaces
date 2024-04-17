import { removeIdleTimer } from "./idle-timer-home.js";

function playVideo(videoPathsObj) {
  removeIdleTimer();
  window.electronAPI.sendLaunchVideo(videoPathsObj);
}

export { playVideo };
