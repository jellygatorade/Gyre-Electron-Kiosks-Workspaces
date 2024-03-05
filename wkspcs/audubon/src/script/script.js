import { callFetchCreateUI } from "./fetch.js";
import { attractViewInit } from "./attract-view.js";
import { mainMenuInit } from "./main-menu-view.js";
import { watchMenuInit } from "./watch-menu-view.js";
import { readViewInit } from "./read-view.js";
import { idleTimerInit } from "./idle-timer/idle-timer-setup.js";
import {
  applyLanguage,
  setLanguage,
  lang,
  langToggle,
} from "./language-switcher.js";
import { views } from "./initialize-views.js";

attractViewInit();
mainMenuInit();
watchMenuInit();
readViewInit();
idleTimerInit();
callFetchCreateUI();

// Determine if there was a language previously set
if (localStorage.getItem("langState")) {
  setLanguage(localStorage.getItem("langState"));
}

// Apply the language specified in current "langState"
applyLanguage(lang.langState);

// Set up toggle lang button listeners
langToggle.init();

// Set up UI macro state management and fade in initial view
views.init();
