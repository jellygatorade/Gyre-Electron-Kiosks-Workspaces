import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { idleTimer } from "./idle-timer/idle-timer-static-class.js";

function mainMenuInit() {
  dom.mainMenuWatchBtn.addEventListener("click", () => {
    UIViewController.setView(views.watchMenu);
  });

  dom.mainMenuReadBtn.addEventListener("click", () => {
    UIViewController.setView(views.read);
  });

  dom.mainMenuBackBtn.addEventListener("click", () => {
    idleTimer.remove();
    dom.attractVideo.play();
    UIViewController.setView(views.attract);
  });

  // dom.mainMenuToggleLangBtn
}

export { mainMenuInit };
