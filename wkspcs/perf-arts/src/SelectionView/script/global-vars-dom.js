// Attract View
const attractView = document.getElementById("attract-view");
const attractVideo = document.getElementById("attract-video");
const attractOverlay = document.getElementById("attract-overlay");

const enAttractTitle = document.getElementById("en-attract-title");
const esAttractTitle = document.getElementById("es-attract-title");

const enAttractTouchToBegin = document.getElementById(
  "en-attract-touch-to-begin"
);
const esAttractTouchToBegin = document.getElementById(
  "es-attract-touch-to-begin"
);

// Home View
const homeView = document.getElementById("home-view");
const toggleLangButton = document.getElementById("toggle-lang-button");

const enHomeViewTitle = document.getElementById("en-home-view-title");
const enHomeViewSubheading = document.getElementById("en-home-view-subheading");

const esHomeViewTitle = document.getElementById("es-home-view-title");
const esHomeViewSubheading = document.getElementById("es-home-view-subheading");

//// Home View - Video Cards
const homeViewVideoCardFlexbox = document.getElementById(
  "home-view-video-card-flexbox"
);
const homeViewVideoCardPrototype = document.getElementById(
  "video-card-prototype"
);
const enHomeViewVideoCardPrototype = document.getElementById(
  "en-video-card-prototype"
);
const esHomeViewVideoCardPrototype = document.getElementById(
  "es-video-card-prototype"
);

// //// Home View - Videos
// //// For each video div, store the <button> (to play video), <img> (for still image), <h3> (title), and <p> (description)
// //// As an object in an array containing each
// //// One array of objs for english and one for spanish
// let videoUIHTMLcollection = homeView.getElementsByClassName(
//   "js-video-ui-container"
// );
// let videos = { en: [], es: [] };
// for (let i = 0; i < videoUIHTMLcollection.length; i++) {
//   videos.en[i] = {};
//   videos.en[i].btn = videoUIHTMLcollection[i].querySelector(
//     ".en-js-video-ui-btn"
//   );
//   videos.en[i].img = videoUIHTMLcollection[i].querySelector(
//     ".en-js-video-ui-img"
//   );
//   videos.en[i].nowPlaying = videoUIHTMLcollection[i].querySelector(
//     ".en-js-video-ui-now-playing"
//   );
//   videos.en[i].title = videoUIHTMLcollection[i].querySelector(
//     ".en-js-video-ui-title"
//   );
//   videos.en[i].description = videoUIHTMLcollection[i].querySelector(
//     ".en-js-video-ui-description"
//   );

//   videos.es[i] = {};
//   videos.es[i].btn = videoUIHTMLcollection[i].querySelector(
//     ".es-js-video-ui-btn"
//   );
//   videos.es[i].img = videoUIHTMLcollection[i].querySelector(
//     ".es-js-video-ui-img"
//   );
//   videos.es[i].nowPlaying = videoUIHTMLcollection[i].querySelector(
//     ".es-js-video-ui-now-playing"
//   );
//   videos.es[i].title = videoUIHTMLcollection[i].querySelector(
//     ".es-js-video-ui-title"
//   );
//   videos.es[i].description = videoUIHTMLcollection[i].querySelector(
//     ".es-js-video-ui-description"
//   );
// }

export {
  // Attract View
  attractView,
  attractVideo,
  attractOverlay,
  enAttractTitle,
  esAttractTitle,
  enAttractTouchToBegin,
  esAttractTouchToBegin,
  // Home View
  homeView,
  toggleLangButton,
  enHomeViewTitle,
  enHomeViewSubheading,
  esHomeViewTitle,
  esHomeViewSubheading,
  //// Home View - Video Cards
  homeViewVideoCardFlexbox,
  homeViewVideoCardPrototype,
  enHomeViewVideoCardPrototype,
  esHomeViewVideoCardPrototype,
  //videos,
};
