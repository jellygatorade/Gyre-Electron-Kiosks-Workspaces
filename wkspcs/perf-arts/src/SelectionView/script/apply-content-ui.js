import * as domVars from "./global-vars-dom.js";
import { applyVideoCards } from "./apply-content-ui-video-cards.js";

function applyContent(data) {
  // Spanish availability
  // Set domVars.toggleLangButton to "display: none;" if not available
  if (!data.es.is_available) {
    domVars.toggleLangButton.classList.add("hidden");
  }

  // Attract View
  domVars.enAttractTitle.innerHTML = data.en.attract.title;
  domVars.esAttractTitle.innerHTML = data.es.attract.title;

  domVars.enAttractTouchToBegin.innerHTML = data.en.attract.touch_to_begin;
  domVars.esAttractTouchToBegin.innerHTML = data.es.attract.touch_to_begin;

  // Home View
  domVars.enHomeViewTitle.innerHTML = data.en.main.title;
  domVars.enHomeViewSubheading.innerHTML = data.en.main.subheading;

  domVars.esHomeViewTitle.innerHTML = data.es.main.title;
  domVars.esHomeViewSubheading.innerHTML = data.es.main.subheading;

  //// Home View - Video Cards
  applyVideoCards(data);

  // //// Home View - Videos - en
  // for (let i = 0; i < domVars.videos.en.length; i++) {
  //   // videoPathsObj contains video paths to be passed to playVideo()
  //   let videoPathsObj = {
  //     videoToPlayPath: data.en.main.videos[i].video_path,
  //     videoLoopRevertPath: data.attract_video_path,
  //   };

  //   domVars.videos.en[i].btn.onclick = function (event) {
  //     fadeOutAllNowPlaying();
  //     enableAllVideoBtns();
  //     fadeIn(event.currentTarget.querySelector(".en-js-video-ui-now-playing"));
  //     playVideo(videoPathsObj);
  //     event.currentTarget.disabled = true;
  //   };

  //   domVars.videos.en[i].img.src = data.en.main.videos[i].still_path;
  //   domVars.videos.en[i].title.innerHTML = data.en.main.videos[i].title;
  //   domVars.videos.en[i].description.innerHTML =
  //     data.en.main.videos[i].description;
  // }

  // //// Home View - Videos - es
  // for (let i = 0; i < domVars.videos.es.length; i++) {
  //   // videoPathsObj contains video paths to be passed to playVideo()
  //   let videoPathsObj = {
  //     videoToPlayPath: data.es.main.videos[i].video_path,
  //     videoLoopRevertPath: data.attract_video_path,
  //   };

  //   domVars.videos.es[i].btn.onclick = function (event) {
  //     fadeOutAllNowPlaying();
  //     enableAllVideoBtns();
  //     fadeIn(event.currentTarget.querySelector(".es-js-video-ui-now-playing"));
  //     playVideo(videoPathsObj);
  //     event.currentTarget.disabled = true;
  //   };

  //   domVars.videos.es[i].img.src = data.es.main.videos[i].still_path;
  //   domVars.videos.es[i].title.innerHTML = data.es.main.videos[i].title;
  //   domVars.videos.es[i].description.innerHTML =
  //     data.es.main.videos[i].description;
  // }
}

export { applyContent };
