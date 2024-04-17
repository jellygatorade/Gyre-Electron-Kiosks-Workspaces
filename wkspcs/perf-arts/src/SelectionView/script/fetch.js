import { applyContent } from "./apply-content-ui.js";
import { createAttractLoop } from "./attract-view.js";

function callFetchCreateUI() {
  fetch("../common/assets/content.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Populate innerHTML for all content + all languages
      applyContent(data);

      // Create the attract video loop for the selection view
      createAttractLoop(data.attract_video_path);

      // Send attract video path to main renderer to be sent to video view renderer
      window.electronAPI.sendAttractLoopPath(data.attract_video_path);

      // Send instructional text string to main renderer to be sent to video view renderer
      window.electronAPI.sendInstructionalTextStr({
        en: data.en.attract.projection_instruction,
        es: data.es.attract.projection_instruction,
      });
    });
}

export { callFetchCreateUI };
