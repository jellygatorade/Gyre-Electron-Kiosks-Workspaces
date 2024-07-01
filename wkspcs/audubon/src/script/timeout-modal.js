import { dom } from "./dom.js";
import { animationHandler } from "./ui-macro-state/animation-handler.js";
import { idleTimer } from "./idle-timer/idle-timer-static-class.js";
import { returnToAttractView } from "./attract-view.js";
import { flipbook } from "./flipbook/flipbook-spreads-only.js";

function timeoutModalInit() {
  console.log(idleTimer.idleTimeoutInSeconds);

  idleTimer.onLoadCountdown = function () {
    dom.nonlocalized.timeout_modal.countdown_text.innerText = idleTimer.countdownAmountInSeconds;
    animationHandler.fadeIn(dom.nonlocalized.timeout_modal.modal);
  };

  idleTimer.onCountdownIteration = function (numberTimeRemaining) {
    dom.nonlocalized.timeout_modal.countdown_text.innerText = numberTimeRemaining;
  };

  dom.nonlocalized.timeout_modal.tap_to_continue_overlay.addEventListener("click", (event) => {
    idleTimer.cancel(event);
    animationHandler.fadeOut(dom.nonlocalized.timeout_modal.modal);
  });

  // onUserInactive action
  if (window.useAttract) {
    idleTimer.onUserInactive = function () {
      animationHandler.fadeOut(dom.nonlocalized.timeout_modal.modal);
      returnToAttractView();

      // once animation is complete
      setTimeout(() => {
        flipbook.reset();
      }, 300);
    };
  } else {
    idleTimer.onUserInactive = function () {
      animationHandler.fadeOut(dom.nonlocalized.timeout_modal.modal);

      // once animation is complete
      setTimeout(() => {
        flipbook.reset();
        idleTimer.setup();
      }, 300);
    };
  }
}

export { timeoutModalInit };
