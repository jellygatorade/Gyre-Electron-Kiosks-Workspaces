import { UIViewController } from "./ui-macro-state/ui-view-controller.js";
import { view } from "./ui-macro-state/view.js";
import { dom } from "./dom.js";
import { idleTimer } from "./idle-timer/idle-timer-static-class.js";

const views = {
  attract: null,
  mainMenu: null,
  watchMenu: null,
  videoPlayer: null,
  read: null,

  init: function () {
    this.attract = new view(dom.nonlocalized.attract.view);
    this.mainMenu = new view(dom.nonlocalized.main_menu.view);
    this.watchMenu = new view(dom.nonlocalized.watch_menu.view);
    this.videoPlayer = new view(dom.nonlocalized.video_player.view);
    this.read = new view(dom.nonlocalized.read_view.view);

    if (window.useAttract) {
      UIViewController.setView(views.attract);
    } else {
      UIViewController.setView(views.read); // INITIALIZE TO READ VIEW
      idleTimer.setup();
    }
  },
};

export { views };
