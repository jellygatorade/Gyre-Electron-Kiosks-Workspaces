import { domVars } from "./dom.js";

function applyContent(data) {
  // Attract View
  domVars.attractAccentBg.style.backgroundColor = data.accent_color;
  domVars.attractTitle.innerHTML = data.en.attract.title;
  domVars.attractTouchToBegin.innerHTML = data.en.attract.touch_to_begin;

  domVars.attractVideoPlayer.src = data.attract_video_path;

  // Main Video Player
  domVars.mainVideoPlayer.src = data.main_video_path;
  domVars.returnHomeBtn.innerHTML = data.en.main_video.return_home;
}

export { applyContent };
