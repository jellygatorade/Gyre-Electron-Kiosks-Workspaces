import * as domVars from "./global-vars-dom.js";
import { applyVideoCards } from "./apply-content-ui-video-cards.js";

function applyContent(data) {
  // Spanish availability
  // Set domVars.toggleLangButton to "display: none;" if not available
  if (!data.es.is_available) {
    domVars.toggleLangButton.classList.add("hidden");
  }

  // Attract View
  domVars.enAttractTitle1.innerHTML = data.en.attract.title_1;
  domVars.esAttractTitle1.innerHTML = data.es.attract.title_1;
  domVars.enAttractTitle2.innerHTML = data.en.attract.title_2;
  domVars.esAttractTitle2.innerHTML = data.es.attract.title_2;

  domVars.enAttractTouchToBegin.innerHTML = data.en.attract.touch_to_begin;
  domVars.esAttractTouchToBegin.innerHTML = data.es.attract.touch_to_begin;

  // Home View
  domVars.enHomeViewTitle1.innerHTML = data.en.main.title_1;
  domVars.enHomeViewTitle2.innerHTML = data.en.main.title_2;
  // domVars.enHomeViewSubheading.innerHTML = data.en.main.subheading;

  domVars.esHomeViewTitle1.innerHTML = data.es.main.title_1;
  domVars.esHomeViewTitle2.innerHTML = data.es.main.title_2;
  // domVars.esHomeViewSubheading.innerHTML = data.es.main.subheading;

  //// Home View - Video Cards
  applyVideoCards(data);

  // Video View
  domVars.enVideoPlayerReturnHomeBtnTxt.innerHTML =
    data.en.video_player.back_to_main;
  domVars.esVideoPlayerReturnHomeBtnTxt.innerHTML =
    data.es.video_player.back_to_main;
}

export { applyContent };
