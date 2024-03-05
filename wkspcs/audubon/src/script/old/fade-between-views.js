import * as domVars from "../global-vars-dom.js";
import { fadeIn, fadeOut } from "./fade-in-out-elements.js";

function fadeBetweenViews(tofadeout, tofadein) {
  fadeIn(domVars.fadeBetweenViewsOverlay);
  setTimeout(() => {
    fadeOut(tofadeout);
  }, 150);
  setTimeout(() => {
    fadeIn(tofadein);
  }, 300);
  setTimeout(() => {
    fadeOut(domVars.fadeBetweenViewsOverlay);
  }, 300);
}

export { fadeBetweenViews };
