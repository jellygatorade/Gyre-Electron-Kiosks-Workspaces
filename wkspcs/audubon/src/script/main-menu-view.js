import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { idleTimer } from "./idle-timer/idle-timer-static-class.js";
import { returnToAttractView } from "./attract-view.js";

function mainMenuInit() {
  dom.mainMenuWatchBtn.addEventListener("click", () => {
    UIViewController.setView(views.watchMenu);
  });

  dom.mainMenuReadBtn.addEventListener("click", () => {
    UIViewController.setView(views.read);
  });

  dom.mainMenuBackBtn.addEventListener("click", () => {
    returnToAttractView();
  });
}

export { mainMenuInit };
