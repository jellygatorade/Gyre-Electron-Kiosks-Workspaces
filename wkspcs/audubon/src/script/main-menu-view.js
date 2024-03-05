import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { removeIdleTimer } from "./idle-timer-home.js";

function mainMenuInit() {
  dom.mainMenuWatchBtn.addEventListener("click", () => {
    UIViewController.setView(views.watchMenu);
  });

  dom.mainMenuReadBtn.addEventListener("click", () => {
    UIViewController.setView(views.read);
  });

  dom.mainMenuBackBtn.addEventListener("click", () => {
    removeIdleTimer();
    dom.attractVideo.play();
    UIViewController.setView(views.attract);
  });

  // dom.mainMenuToggleLangBtn
}

export { mainMenuInit };
