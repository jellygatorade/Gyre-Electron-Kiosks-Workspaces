import { animationHandler } from "./animation-handler.js";

class UIViewController {
  static currentView = null;
  static lastView = null;

  static setView(view) {
    animationHandler.swapViews(this.currentView, view);
    this.lastView = this.currentView; // store previous view, not currently used
    this.currentView = view;
  }

  static getCurrentView() {
    return this.currentView;
  }
}

export { UIViewController };
