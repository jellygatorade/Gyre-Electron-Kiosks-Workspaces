import { dom } from "./dom.js";
import { animationHandler } from "./ui-macro-state/animation-handler.js";
import { idleTimer } from "./idle-timer/idle-timer-static-class.js";
import { returnToAttractView } from "./attract-view.js";
import { flipbook } from "./flipbook/flipbook-spreads-only.js";

function timeoutModalInit() {
  //   dom.readViewBackButton.addEventListener("click", () => {
  //     UIViewController.setView(views.mainMenu);
  //   });
  idleTimer.onLoadCountdown = function () {
    dom.timeoutCountdownText.innerText = idleTimer.countdownAmountInSeconds;
    animationHandler.fadeIn(dom.timeoutModal);
  };

  idleTimer.onCountdownIteration = function (numberTimeRemaining) {
    dom.timeoutCountdownText.innerText = numberTimeRemaining;
  };

  idleTimer.onUserInactive = function () {
    animationHandler.fadeOut(dom.timeoutModal);
    returnToAttractView();

    // once animation is complete
    setTimeout(() => {
      flipbook.reset();
    }, 300);
  };

  dom.timeoutModalTapToContinueOverlay.addEventListener("click", (event) => {
    idleTimer.cancel(event);
    animationHandler.fadeOut(dom.timeoutModal);
  });
}

export { timeoutModalInit };
