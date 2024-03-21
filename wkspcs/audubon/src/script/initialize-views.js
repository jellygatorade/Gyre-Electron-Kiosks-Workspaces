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
    this.watchMenu = new view(dom.nonlocalized.watch_menu.view);
    this.videoPlayer = new view(dom.nonlocalized.video_player.view);
    this.read = new view(dom.nonlocalized.read_view.view);

    UIViewController.setView(views.attract);
  },
};

export { views };
