import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { idleTimer } from "./idle-timer/idle-timer-static-class.js";
import { returnToAttractView } from "./attract-view.js";

function mainMenuInit() {
  dom.nonlocalized.main_menu.watch_btn.addEventListener("click", () => {
    UIViewController.setView(views.watchMenu);
  });

  dom.nonlocalized.main_menu.read_btn.addEventListener("click", () => {
    UIViewController.setView(views.read);
  });

  dom.nonlocalized.main_menu.back_btn.addEventListener("click", () => {
    returnToAttractView();
  });
}

export { mainMenuInit };
