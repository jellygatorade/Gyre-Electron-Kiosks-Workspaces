/***************************************************
 * In ES6 / ES2015 class syntax
 *
 * Showing usage of static and private methods (# prefix)
 ***************************************************/

// No need for constructor function since all methods are static
// No need for "this" keyword because static methods are called on the class, not the instance
class idleTimer {
  /**************************
   * Public fields
   **************************/
  static idleTimeoutInSeconds = 90;
  static countdownAmountInSeconds = 15;

  static onCountdownIteration = null;
  static onLoadCountdown = null;
  static onUserInactive = null;
  // static onCancel = null;

  /**************************
   * Private fields
   **************************/

  static #idleTimeoutId = 0;
  static #idleTimeoutInMilliseconds;

  static #timeLeft;

  static #countdownTimerIntervalId;
  static #doInactive2ActionTimeoutId;

  /**************************
   * Tier 1 Methods
   **************************/

  static #_start() {
    idleTimer.#idleTimeoutId = window.setTimeout(
      idleTimer.#_doInactive,
      idleTimer.#idleTimeoutInMilliseconds
    );
  }

  static #_doInactive() {
    console.log("doInactive");

    // Action taken on inactivity
    // Refresh to homepage
    //
    //window.location.reload();

    idleTimer.remove(); // Stop listening for user activity
    idleTimer.#_loadIdleTimerTier2(); // Setup tier 2 timer
  }

  static #_goActive() {
    // console.log("Go active");
    idleTimer.#_start();
    // Do something along with startIdleTimer
  }

  static #_resetTimer() {
    window.clearTimeout(idleTimer.#idleTimeoutId);
    idleTimer.#_goActive();
  }

  static setup() {
    // if idleTimer.#idleTimeoutId === 0, then setup will not run again
    if (!idleTimer.#idleTimeoutId) {
      console.log("Set up idle timer - tier 1");

      // Each of these events will reset the timer ("mousemove", "mousedown", etc)
      window.addEventListener("mousemove", idleTimer.#_resetTimer, false); // fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it
      window.addEventListener("mousedown", idleTimer.#_resetTimer, false); // fired at an element when a pointing device button is pressed while the pointer is inside the element (differs from "click")
      window.addEventListener("keydown", idleTimer.#_resetTimer, false); // fired when a key is pressed (for all keys, regardless of whether they produce a character value)
      window.addEventListener("DOMMouseScroll", idleTimer.#_resetTimer, false); // deprecated for "wheel"
      window.addEventListener("mousewheel", idleTimer.#_resetTimer, false); // deprecated for "wheel"
      window.addEventListener("wheel", idleTimer.#_resetTimer, false); // fires when the user rotates a wheel button on a pointing device (typically a mouse)
      window.addEventListener("touchmove", idleTimer.#_resetTimer, false); // fired when one or more touch points are moved along the touch surface
      window.addEventListener("touchstart", idleTimer.#_resetTimer, false); // fired when one or more touch points are placed on the touch surface
      window.addEventListener("pointermove", idleTimer.#_resetTimer, false); // fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action

      idleTimer.#idleTimeoutInMilliseconds =
        idleTimer.idleTimeoutInSeconds * 1000;

      idleTimer.#_start();
    }
  }

  static remove() {
    window.removeEventListener("mousemove", idleTimer.#_resetTimer, false); // fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it
    window.removeEventListener("mousedown", idleTimer.#_resetTimer, false); // fired at an element when a pointing device button is pressed while the pointer is inside the element (differs from "click")
    window.removeEventListener("keydown", idleTimer.#_resetTimer, false); // fired when a key is pressed (for all keys, regardless of whether they produce a character value)
    window.removeEventListener("DOMMouseScroll", idleTimer.#_resetTimer, false); // deprecated for "wheel"
    window.removeEventListener("mousewheel", idleTimer.#_resetTimer, false); // deprecated for "wheel"
    window.removeEventListener("wheel", idleTimer.#_resetTimer, false); // fires when the user rotates a wheel button on a pointing device (typically a mouse)
    window.removeEventListener("touchmove", idleTimer.#_resetTimer, false); // fired when one or more touch points are moved along the touch surface
    window.removeEventListener("touchstart", idleTimer.#_resetTimer, false); // fired when one or more touch points are placed on the touch surface
    window.removeEventListener("pointermove", idleTimer.#_resetTimer, false); // fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action

    window.clearTimeout(idleTimer.#idleTimeoutId);
    idleTimer.#idleTimeoutId = 0;

    console.log("Remove idle timer - tier 1");
  }

  /**************************
   * Tier 2 Methods
   **************************/

  static #_countdownIterator() {
    console.log(idleTimer.#timeLeft);

    // Update countdown text in UI
    if (typeof idleTimer.onCountdownIteration === "function") {
      idleTimer.onCountdownIteration(idleTimer.#timeLeft);
    }

    if (idleTimer.#timeLeft <= 0) {
      clearInterval(idleTimer.#countdownTimerIntervalId);
      //console.log(idleTimer.#timeLeft);
      //domVars.countdownRemaining.innerText = "0";
      idleTimer.#timeLeft = idleTimer.countdownAmountInSeconds - 1; // reset
      clearTimeout(idleTimer.#doInactive2ActionTimeoutId);
      // Reset the application
      idleTimer.#doInactive2ActionTimeoutId = setTimeout(
        idleTimer.#_doInactive2(),
        1000
      );
    } else {
      //domVars.countdownRemaining.innerText = #timeLeft;
      //console.log(idleTimer.#timeLeft);
    }

    idleTimer.#timeLeft -= 1;
  }

  static #_runIdleTimerTier2() {
    idleTimer.#countdownTimerIntervalId = setInterval(
      idleTimer.#_countdownIterator,
      1000
    );
  }

  static #_loadIdleTimerTier2() {
    // Fade in a UI countdown modal
    // fadeIn(domVars.timeoutModal);
    if (typeof idleTimer.onLoadCountdown === "function") {
      idleTimer.onLoadCountdown();
    }

    // Update a UI string with idleTimer.countdownAmountInSeconds
    // //domVars.countdownRemaining.innerText = idleTimer.countdownAmountInSeconds;
    if (typeof idleTimer.onCountdownIteration === "function") {
      idleTimer.onCountdownIteration(idleTimer.countdownAmountInSeconds);
    }

    console.log(idleTimer.countdownAmountInSeconds);
    idleTimer.#timeLeft = idleTimer.countdownAmountInSeconds - 1;
    idleTimer.#_runIdleTimerTier2();
  }

  static #_doInactive2() {
    // console.log("Do inactive - tier 2");
    if (typeof idleTimer.onUserInactive === "function") {
      idleTimer.onUserInactive();
    }
  }

  static cancel(event) {
    event.stopPropagation();

    clearInterval(idleTimer.#countdownTimerIntervalId);
    idleTimer.#timeLeft = idleTimer.countdownAmountInSeconds - 1;
    idleTimer.setup(); // tier 1

    // Fade out a UI countdown modal
    //
    //fadeOut(domVars.timeoutModal);
  }
}

export { idleTimer };
