import { applyContent } from "./apply-content-ui.js";
import { createAttractLoop } from "./attract-view.js";

function callFetchCreateUI() {
  fetch("./assets/content.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Populate innerHTML for all content + all languages
      applyContent(data);

      // Create the attract video loop
      createAttractLoop(data.attract_video_path);
    });
}

export { callFetchCreateUI };
