import { callFetchCreateUI } from "./fetch.js";
import { attractViewInitFns } from "./attract-view.js";
import { applyLanguage, setLanguage, lang } from "./language-switcher.js";

attractViewInitFns();
callFetchCreateUI();

// Determine if there was a language previously set
if (localStorage.getItem("langState")) {
  setLanguage(localStorage.getItem("langState"));
}

// Apply the language specified in current "langState"
applyLanguage(lang.langState);
