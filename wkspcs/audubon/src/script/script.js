import { callFetchCreateUI } from "./fetch.js";
import { timeoutModalInit } from "./timeout-modal.js";
import { attractViewInit } from "./attract-view.js";
import { mainMenuInit } from "./main-menu-view.js";
import { watchMenuInit } from "./watch-menu-view.js";
import { readViewInit } from "./read-view.js";
import { idleTimerInit } from "./idle-timer/idle-timer-setup.js";
import { controlsOverlay } from "./flipbook/controls-overlay.js";
import { flipbook } from "./flipbook/flipbook-spreads-only.js";
import { applyLanguage, setLanguage, lang, langToggle } from "./language-switcher.js";
import { views } from "./initialize-views.js";

// Configure for no attract state
window.useAttract = true;

idleTimerInit();
timeoutModalInit();
attractViewInit();
mainMenuInit();
watchMenuInit();
readViewInit();
callFetchCreateUI();
controlsOverlay.init();
flipbook.init();

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
