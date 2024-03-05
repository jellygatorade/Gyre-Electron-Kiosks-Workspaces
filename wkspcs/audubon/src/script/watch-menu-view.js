import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";

function watchMenuInit() {
  dom.watchMenuBackButton.addEventListener("click", () => {
    UIViewController.setView(views.mainMenu);
  });
}

export { watchMenuInit };
