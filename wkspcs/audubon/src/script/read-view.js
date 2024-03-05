import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";

function readViewInit() {
  dom.readViewBackButton.addEventListener("click", () => {
    UIViewController.setView(views.mainMenu);
  });
}

export { readViewInit };
