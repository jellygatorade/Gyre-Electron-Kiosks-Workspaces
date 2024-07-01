import { dom } from "./dom.js";
import { views } from "./initialize-views.js";
import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { flipbook } from "./flipbook/flipbook-spreads-only.js";
import { returnToAttractView } from "./attract-view.js";

function readViewInit() {
  dom.nonlocalized.read_view.back_btn.addEventListener("click", () => {
    // UIViewController.setView(views.mainMenu);
    returnToAttractView();

    // once animation is complete
    setTimeout(() => {
      flipbook.reset();
    }, 300);
  });

  if (!window.useAttract) {
    dom.nonlocalized.read_view.back_btn.classList.add("hidden"); // HIDE THE GO BACK BUTTON
  }
}

export { readViewInit };
