import * as domVars from "./global-vars-dom.js";

// Export a function that ensures all launch video buttons are enabled.
// These are disabled once they are pressed so that video can't be accidently restarted by pressing again while playing.
// The buttons need to be renabled once a video ends or if the user selects another video.

function enableAllVideoBtns() {
  const enVideoBtnNodeList = Array.from(
    domVars.homeView.querySelectorAll(".en-js-video-ui-btn")
  );

  const esVideoBtnNodeList = Array.from(
    domVars.homeView.querySelectorAll(".es-js-video-ui-btn")
  );

  const videoBtnNodeList = enVideoBtnNodeList.concat(esVideoBtnNodeList);

  videoBtnNodeList.forEach((element) => (element.disabled = false));
}

export { enableAllVideoBtns };
