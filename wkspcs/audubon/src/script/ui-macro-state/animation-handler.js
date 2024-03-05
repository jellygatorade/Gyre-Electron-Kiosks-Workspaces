import { dom } from "../dom.js";

class animationHandler {
  static overlay = dom.fadeBetweenViewsOverlay;
  static duration = 300;

  // Code that executes pre/post transition methods on each view usable but commented out
  static swapViews(lastView, nextView) {
    animationHandler.fadeIn(animationHandler.overlay);

    if (lastView) {
      setTimeout(() => {
        // if (lastView.preExitAction) {
        //   lastView.preExitAction();
        // }

        animationHandler.fadeOut(lastView.root);
      }, animationHandler.duration / 2);

      // setTimeout(() => {
      //   if (lastView.postExitAction) {
      //     lastView.postExitAction();
      //   }
      // }, (3 * animationHandler.duration) / 2);
    }

    setTimeout(() => {
      // if (nextView.preEnterAction) {
      //   nextView.preEnterAction();
      // }

      animationHandler.fadeIn(nextView.root);
      animationHandler.fadeOut(animationHandler.overlay);
    }, animationHandler.duration);

    // setTimeout(() => {
    //   if (nextView.postEnterAction) {
    //     nextView.postEnterAction();
    //   }
    // }, animationHandler.duration * 2);
  }

  static fadeIn(element) {
    element.classList.remove("opacity-0");
    element.classList.remove("invisible");
    element.classList.remove("pointer-events-none");
    element.classList.add("opacity-100");
    element.classList.add("visible");
    element.classList.add("pointer-events-auto");
  }

  static fadeOut(element) {
    element.classList.remove("opacity-100");
    element.classList.remove("visible");
    element.classList.remove("pointer-events-auto");
    element.classList.add("opacity-0");
    element.classList.add("invisible");
    element.classList.add("pointer-events-none");
  }
}

export { animationHandler };
