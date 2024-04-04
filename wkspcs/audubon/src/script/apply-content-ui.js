import { dom } from "./dom.js";
import { applyVideoCards } from "./apply-content-ui-video-cards.js";

function applyContent(data) {
  // Spanish availability
  // Set language toggle buttons to "display: none;" if not available
  if (!data.es.is_available) {
    dom.nonlocalized.main_menu.toggle_lang_btn.classList.add("hidden");
    dom.nonlocalized.watch_menu.toggle_lang_btn.classList.add("hidden");
    dom.nonlocalized.read_view.toggle_lang_btn.classList.add("hidden");
  }

  // Timeout modal
  dom.localized.en.timeout_modal.still_viewing.innerHTML =
    data.en.timeout_modal.still_viewing;
  dom.localized.en.timeout_modal.touch_to_continue.innerHTML =
    data.en.timeout_modal.touch_to_continue;

  dom.localized.es.timeout_modal.still_viewing.innerHTML =
    data.es.timeout_modal.still_viewing;
  dom.localized.es.timeout_modal.touch_to_continue.innerHTML =
    data.es.timeout_modal.touch_to_continue;

  // Attract View
  dom.localized.en.attract.title.innerHTML = data.en.attract.title;
  dom.localized.en.attract.touch_to_begin.innerHTML = data.en.attract.touch_to_begin;

  dom.localized.es.attract.title.innerHTML = data.es.attract.title;
  dom.localized.es.attract.touch_to_begin.innerHTML = data.es.attract.touch_to_begin;

  // Main Menu View
  dom.localized.en.main_menu.title.innerHTML = data.en.main_menu.title;
  dom.localized.en.main_menu.watch.innerHTML = data.en.main_menu.watch;
  dom.localized.en.main_menu.read.innerHTML = data.en.main_menu.read;
  dom.localized.en.main_menu.back.innerHTML = data.en.general.go_back;
  dom.localized.en.main_menu.toggle_lang.innerHTML =
    data.en.general.toggle_lang;

  dom.localized.es.main_menu.title.innerHTML = data.es.main_menu.title;
  dom.localized.es.main_menu.watch.innerHTML = data.es.main_menu.watch;
  dom.localized.es.main_menu.read.innerHTML = data.es.main_menu.read;
  dom.localized.es.main_menu.back.innerHTML = data.es.general.go_back;
  dom.localized.es.main_menu.toggle_lang.innerHTML =
    data.es.general.toggle_lang;

  // Watch Menu View
  dom.localized.en.watch_menu.title.innerHTML = data.en.watch_menu.title;
  dom.localized.en.watch_menu.subheading.innerHTML =
    data.en.watch_menu.subheading;
  dom.localized.en.watch_menu.back.innerHTML = data.en.general.go_back;
  dom.localized.en.watch_menu.toggle_lang.innerHTML =
    data.en.general.toggle_lang;

  dom.localized.es.watch_menu.title.innerHTML = data.es.watch_menu.title;
  dom.localized.es.watch_menu.subheading.innerHTML =
    data.es.watch_menu.subheading;
  dom.localized.es.watch_menu.back.innerHTML = data.es.general.go_back;
  dom.localized.es.watch_menu.toggle_lang.innerHTML =
    data.es.general.toggle_lang;

  // Watch Menu View - Video Cards
  applyVideoCards(data);

  // Video View
  dom.localized.en.video_player.return_home.innerHTML =
    data.en.video_player.back_to_main;
  dom.localized.es.video_player.return_home.innerHTML =
    data.es.video_player.back_to_main;

  // Read View - Turn.js
  dom.localized.en.read_view.title.innerHTML = data.en.read_view.title;
  dom.localized.en.read_view.description.innerHTML =
    data.en.read_view.description;
  dom.localized.en.read_view.back.innerHTML = data.en.general.go_back;
  dom.localized.en.read_view.toggle_lang.innerHTML =
    data.en.general.toggle_lang;

  dom.localized.es.read_view.title.innerHTML = data.es.read_view.title;
  dom.localized.es.read_view.description.innerHTML =
    data.es.read_view.description;
  dom.localized.es.read_view.back.innerHTML = data.es.general.go_back;
  dom.localized.es.read_view.toggle_lang.innerHTML =
    data.es.general.toggle_lang;
}

export { applyContent };
