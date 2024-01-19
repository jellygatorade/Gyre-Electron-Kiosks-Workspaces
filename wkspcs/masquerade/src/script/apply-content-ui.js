import * as domVars from "./global-vars-dom.js";
import { applyVideoCards } from "./apply-content-ui-video-cards.js";

function applyContent(data) {
  // Spanish availability
  // Set domVars.toggleLangButton to "display: none;" if not available
  if (!data.es.is_available) {
    domVars.toggleLangButton.classList.add("hidden");
  }

  // Attract View
  domVars.enAttractTitle.innerHTML = data.en.attract.title;
  domVars.esAttractTitle.innerHTML = data.es.attract.title;

  domVars.enAttractTouchToBegin.innerHTML = data.en.attract.touch_to_begin;
  domVars.esAttractTouchToBegin.innerHTML = data.es.attract.touch_to_begin;

  // Home View
  domVars.enHomeViewTitle.innerHTML = data.en.main.title;
  domVars.enHomeViewSubheading.innerHTML = data.en.main.subheading;

  domVars.esHomeViewTitle.innerHTML = data.es.main.title;
  domVars.esHomeViewSubheading.innerHTML = data.es.main.subheading;

  //// Home View - Video Cards
  applyVideoCards(data);

  // Video View
  domVars.enVideoPlayerReturnHomeBtnTxt.innerHTML =
    data.en.video_player.back_to_main;
  domVars.esVideoPlayerReturnHomeBtnTxt.innerHTML =
    data.es.video_player.back_to_main;
}

export { applyContent };
