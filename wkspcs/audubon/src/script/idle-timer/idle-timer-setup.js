import { idleTimer } from "./idle-timer-static-class.js";

// No need to create an instance of idleTimer
// We execute methods on the class since all are static
// However, an instance is needed if you want to use get/set accessors

function idleTimerInit() {
  idleTimer.idleTimeoutInSeconds = 5;
  idleTimer.countdownAmountInSeconds = 5;

  // idleTimer methods are defined in timeout-modal.js
  // -- onCountdownIteration
  // -- onLoadCountdown
  // -- onUserInactive
}

export { idleTimerInit };
