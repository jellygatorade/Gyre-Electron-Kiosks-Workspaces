import { fadeOut } from "../../common/script/fade-in-out-elements.js";
import * as domVars from "./global-vars-dom.js";

// Export a function that
// Finds and stores all "now playing" overlays in an array (nowPlayingNodeList)
// Then loops through all of them to fade out

function fadeOutAllNowPlaying() {
  const enNowPlayingNodeList = Array.from(
    domVars.homeView.querySelectorAll(".en-js-video-ui-now-playing")
  );

  const esNowPlayingNodeList = Array.from(
    domVars.homeView.querySelectorAll(".es-js-video-ui-now-playing")
  );

  const nowPlayingNodeList = enNowPlayingNodeList.concat(esNowPlayingNodeList);

  nowPlayingNodeList.forEach((element) => fadeOut(element));
}

export { fadeOutAllNowPlaying };
