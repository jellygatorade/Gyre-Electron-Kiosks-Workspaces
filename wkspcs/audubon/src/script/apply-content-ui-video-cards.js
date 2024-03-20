import { dom } from "./dom.js";
import { playVideo } from "./video-player-view.js";

function applyVideoCards(data) {
  // Create a new array of paired video content per language
  // Pairs of video content will be identified by their "id" property (set in content.json)
  // If a match is not found between languages, it will get its own entry in videoDataArray
  let videoDataArray = createVideoDataArray(data);

  for (let i = 0; i < videoDataArray.length; i++) {
    // console.log(videoDataArray[i]);
    let newVideoCard = dom.watchMenuVideoCardPrototype.cloneNode();
    newVideoCard.id = `video-card-${i}`;
    newVideoCard.classList.remove("hidden");

    // console.log(newVideoCard);

    if (videoDataArray[i].en) {
      let newVideoCardEn =
        dom.localized.prototypes.en.video_card.cloneNode(true);

      let newVideoBtnEn = newVideoCardEn;
      let newVideoImgEn = newVideoCardEn.querySelector(".en-js-video-ui-img");
      let newVideoTitleEn = newVideoCardEn.querySelector(
        ".en-js-video-ui-title"
      );
      let newVideoDescriptionEn = newVideoCardEn.querySelector(
        ".en-js-video-ui-description"
      );

      newVideoBtnEn.onclick = function () {
        playVideo(videoDataArray[i].en.video_path);
      };
      newVideoImgEn.src = videoDataArray[i].en.still_path;
      newVideoTitleEn.innerHTML = videoDataArray[i].en.title;
      newVideoDescriptionEn.innerHTML = videoDataArray[i].en.description;

      newVideoCard.appendChild(newVideoCardEn);
    }

    if (videoDataArray[i].es) {
      let newVideoCardEs =
        dom.localized.prototypes.es.video_card.cloneNode(true);

      // console.log(newVideoCardEs);

      let newVideoBtnEs = newVideoCardEs;
      let newVideoImgEs = newVideoCardEs.querySelector(".es-js-video-ui-img");
      let newVideoTitleEs = newVideoCardEs.querySelector(
        ".es-js-video-ui-title"
      );
      let newVideoDescriptionEs = newVideoCardEs.querySelector(
        ".es-js-video-ui-description"
      );

      newVideoBtnEs.onclick = function () {
        playVideo(videoDataArray[i].es.video_path);
      };
      newVideoImgEs.src = videoDataArray[i].es.still_path;
      newVideoTitleEs.innerHTML = videoDataArray[i].es.title;
      newVideoDescriptionEs.innerHTML = videoDataArray[i].es.description;

      newVideoCard.appendChild(newVideoCardEs);
    }

    dom.watchMenuVideoCardFlexbox.appendChild(newVideoCard);
  }
}

function createVideoDataArray(data) {
  // Create a new array of paired video content per language
  // Pairs of video content will be identified by their "id" property (set in content.json)
  // If a match is not found between languages, it will get its own entry in videoDataArray
  let videoDataArray = [];

  for (let i = 0; i < data.en.watch_menu.videos.length; i++) {
    let newObj = { en: data.en.watch_menu.videos[i] };
    videoDataArray.push(newObj);
  }

  for (let i = 0; i < data.es.watch_menu.videos.length; i++) {
    let matchedEntry = videoDataArray.find(
      (element) => element.en.id === data.es.watch_menu.videos[i].id
    );
    if (matchedEntry) {
      matchedEntry.es = data.es.watch_menu.videos[i];
    } else if (!matchedEntry) {
      let newObj = { es: data.es.watch_menu.videos[i] };
      videoDataArray.push(newObj);
    }
  }

  // Place unmatched pairs at the end of the array
  // This will make them the last cards in the DOM, as they will be applied last in applyVideoCards
  // https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position
  for (let i = 0; i < videoDataArray.length; i++) {
    if (!videoDataArray[i].en || !videoDataArray[i].es) {
      videoDataArray.push(videoDataArray.splice(i, 1)[0]);
    }
  }

  return videoDataArray;
}

export { applyVideoCards };
