import { callFetchCreateUI } from "./fetch.js";
import { attractViewInitFns } from "./attract-view.js";
import { applyLanguage, setLanguage, lang } from "./language-switcher.js";
import { setupIdleTimer } from "./idle-timer-home.js";
import { fadeOutAllNowPlaying } from "./remove-all-now-playing.js";
import { enableAllVideoBtns } from "./enable-all-video-buttons.js";

attractViewInitFns();
callFetchCreateUI();

// Determine if there was a language previously set
if (localStorage.getItem("langState")) {
  setLanguage(localStorage.getItem("langState"));
}

// Apply the language specified in current "langState"
applyLanguage(lang.langState);
window.electronAPI.sendAppliedLang(lang.langState);

// Set up listener for onVideoEnd
window.electronAPI.onVideoEnd((event, msg) => {
  console.log(msg);
  // Restart the idle timer
  setupIdleTimer();
  // Fade out all "now playing" overlays
  fadeOutAllNowPlaying();
  // Ensure all launch video buttons are selectable
  enableAllVideoBtns();
});

/**********************/
/*******************
 *
 * Testing for reloading one window only
 *
 */
// Testing
// setTimeout(function () {
//   window.location.reload();
// }, 1000);
