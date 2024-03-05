import { dom } from "./dom.js";
import { applyVideoCards } from "./apply-content-ui-video-cards.js";

function applyContent(data) {
  // Spanish availability
  // Set language toggle buttons to "display: none;" if not available
  if (!data.es.is_available) {
    dom.mainMenuToggleLangBtn.classList.add("hidden");
    dom.watchMenuToggleLangButton.classList.add("hidden");
    dom.readViewToggleLangButton.classList.add("hidden");
  }

  // Attract View
  dom.enAttractTitle.innerHTML = data.en.attract.title;
  dom.esAttractTitle.innerHTML = data.es.attract.title;

  dom.enAttractTouchToBegin.innerHTML = data.en.attract.touch_to_begin;
  dom.esAttractTouchToBegin.innerHTML = data.es.attract.touch_to_begin;

  // Main Menu View
  dom.enMainMenuWatch.innerHTML = data.en.main_menu.watch;
  dom.esMainMenuWatch.innerHTML = data.es.main_menu.watch;

  dom.enMainMenuRead.innerHTML = data.en.main_menu.read;
  dom.esMainMenuRead.innerHTML = data.es.main_menu.read;

  dom.enMainMenuBack.innerHTML = data.en.general.go_back;
  dom.esMainMenuBack.innerHTML = data.es.general.go_back;

  dom.enMainMenuToggleLang.innerHTML = data.en.general.toggle_lang;
  dom.esMainMenuToggleLang.innerHTML = data.es.general.toggle_lang;

  // Watch Menu View
  dom.enWatchMenuTitle.innerHTML = data.en.watch_menu.title;
  dom.enWatchMenuSubheading.innerHTML = data.en.watch_menu.subheading;

  dom.esWatchMenuTitle.innerHTML = data.es.watch_menu.title;
  dom.esWatchMenuSubheading.innerHTML = data.es.watch_menu.subheading;

  dom.enWatchMenuBack.innerHTML = data.en.general.go_back;
  dom.esWatchMenuBack.innerHTML = data.es.general.go_back;

  dom.enWatchMenuToggleLang.innerHTML = data.en.general.toggle_lang;
  dom.esWatchMenuToggleLang.innerHTML = data.es.general.toggle_lang;

  // Watch Menu View - Video Cards
  applyVideoCards(data);

  // Video View
  dom.enVideoPlayerReturnHomeBtnTxt.innerHTML =
    data.en.video_player.back_to_main;
  dom.esVideoPlayerReturnHomeBtnTxt.innerHTML =
    data.es.video_player.back_to_main;

  // Read View - Turn.js
  dom.enReadViewBack.innerHTML = data.en.general.go_back;
  dom.esReadViewBack.innerHTML = data.es.general.go_back;

  dom.enReadViewToggleLang.innerHTML = data.en.general.toggle_lang;
  dom.esReadViewToggleLang.innerHTML = data.es.general.toggle_lang;
}

export { applyContent };
