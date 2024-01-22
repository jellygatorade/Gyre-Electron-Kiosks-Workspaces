import { domVars } from "./dom.js";

function applyContent(data) {
  // Attract View
  domVars.attractTitle1.innerHTML = data.en.attract.title_1;
  domVars.attractTitle2.innerHTML = data.en.attract.title_2;
  domVars.attractTouchToBegin.innerHTML = data.en.attract.touch_to_begin;

  domVars.attractVideoPlayer.src = data.attract_video_path;

  // Main Video Player
  domVars.mainVideoPlayer.src = data.main_video_path;
  domVars.returnHomeBtn.innerHTML = data.en.main_video.return_home;
}

export { applyContent };
