import { idleTimer } from "./idle-timer-static-class.js";

// No need to create an instance of idleTimer
// We execute methods on the class since all are static

// However, an instance is needed if you want to use get/set accessors

function idleTimerInit() {
  idleTimer.idleTimeoutInSeconds = 3;
  idleTimer.countdownAmountInSeconds = 10;
}

export { idleTimerInit };
