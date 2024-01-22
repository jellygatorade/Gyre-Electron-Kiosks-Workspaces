// Define timeout functions for auto navigation back home on idle
const idleTimeoutInMiliseconds = 90 * 1000;
let idleTimeoutId;

let reset;
let doInactive;

const idleTimer = {
  init: function () {
    reset = this._reset.bind(this);
    doInactive = this._doInactive.bind(this);
  },

  setup: function () {
    console.log("Set up idle timer");

    // Each of these events will reset the timer ("mousemove", "mousedown", etc)
    window.addEventListener("mousemove", reset, false); // fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it
    window.addEventListener("mousedown", reset, false); // fired at an element when a pointing device button is pressed while the pointer is inside the element (differs from "click")
    window.addEventListener("keydown", reset, false); // fired when a key is pressed (for all keys, regardless of whether they produce a character value)
    window.addEventListener("DOMMouseScroll", reset, false); // deprecated for "wheel"
    window.addEventListener("mousewheel", reset, false); // deprecated for "wheel"
    window.addEventListener("wheel", reset, false); // fires when the user rotates a wheel button on a pointing device (typically a mouse)
    window.addEventListener("touchmove", reset, false); // fired when one or more touch points are moved along the touch surface
    window.addEventListener("touchstart", reset, false); // fired when one or more touch points are placed on the touch surface
    window.addEventListener("pointermove", reset, false); // fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action

    this._start();
  },

  remove: function () {
    window.removeEventListener("mousemove", reset, false); // fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it
    window.removeEventListener("mousedown", reset, false); // fired at an element when a pointing device button is pressed while the pointer is inside the element (differs from "click")
    window.removeEventListener("keydown", reset, false); // fired when a key is pressed (for all keys, regardless of whether they produce a character value)
    window.removeEventListener("DOMMouseScroll", reset, false); // deprecated for "wheel"
    window.removeEventListener("mousewheel", reset, false); // deprecated for "wheel"
    window.removeEventListener("wheel", reset, false); // fires when the user rotates a wheel button on a pointing device (typically a mouse)
    window.removeEventListener("touchmove", reset, false); // fired when one or more touch points are moved along the touch surface
    window.removeEventListener("touchstart", reset, false); // fired when one or more touch points are placed on the touch surface
    window.removeEventListener("pointermove", reset, false); // fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action

    window.clearTimeout(idleTimeoutId);

    console.log("removeIdleTimer called");
  },

  _start: function () {
    idleTimeoutId = window.setTimeout(doInactive, idleTimeoutInMiliseconds);
  },

  _reset: function () {
    window.clearTimeout(idleTimeoutId);
    this._goActive();
  },

  _goActive: function () {
    console.log("Go active");
    this._start();
    // Do something along with this._start();
  },

  _doInactive: function () {
    // Action taken on inactivity
    // Refresh to homepage
    window.location.reload();
    this.remove();
  },
};

export { idleTimer };
