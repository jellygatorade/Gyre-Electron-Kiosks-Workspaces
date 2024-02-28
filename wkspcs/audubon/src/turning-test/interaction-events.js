// A new attempt at handling the difference between touch and mouse devices - 2022/12/6

const interactionEvents = {
  init: function () {
    this.defineInteractionEvents();
  },

  clickEvent: null,
  pressDownEvent: null,
  releaseEvent: null,

  defineInteractionEvents: function () {
    //Define clickEvent variable so that buttons work on 'click' events in desktop browsers and on 'touchstart' events on touchscreens
    this.clickEvent = (function () {
      if ("ontouchstart" in document.documentElement === true)
        return "touchstart";
      else return "click";
    })();

    this.pressDownEvent = (function () {
      if ("ontouchstart" in document.documentElement === true)
        return "touchstart";
      else return "mousedown";
    })();

    this.releaseEvent = (function () {
      if ("ontouchstart" in document.documentElement === true)
        return "touchend";
      else return "mouseup";
    })();
  },
};

export { interactionEvents };
