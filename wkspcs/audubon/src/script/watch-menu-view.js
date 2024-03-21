import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";

function watchMenuInit() {
  dom.nonlocalized.watch_menu.back_btn.addEventListener("click", () => {
    UIViewController.setView(views.mainMenu);
  });
}

export { watchMenuInit };
