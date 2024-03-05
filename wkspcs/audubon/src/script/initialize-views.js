import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { view } from "./ui-macro-state/view.js";
import { dom } from "./dom.js";

const views = {
  attract: null,
  mainMenu: null,
  watchMenu: null,
  videoPlayer: null,
  read: null,

  init: function () {
    this.attract = new view(dom.attractView);
    this.mainMenu = new view(dom.mainMenuView);
    this.watchMenu = new view(dom.watchMenuView);
    this.videoPlayer = new view(dom.videoPlayerView);
    this.read = new view(dom.readView);

    UIViewController.setView(views.attract);
  },
};

export { views };
