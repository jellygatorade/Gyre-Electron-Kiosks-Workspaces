import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { flipbook } from "./flipbook/flipbook-spreads-only.js";

function readViewInit() {
  dom.nonlocalized.read_view.backBtn.addEventListener("click", () => {
    UIViewController.setView(views.mainMenu);

    // once animation is complete
    setTimeout(() => {
      flipbook.reset();
    }, 300);
  });
}

export { readViewInit };
