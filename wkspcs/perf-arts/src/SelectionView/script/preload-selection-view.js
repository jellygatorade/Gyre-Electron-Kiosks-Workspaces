const { contextBridge, ipcRenderer } = require("electron");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
for (const dependency of ["chrome", "node", "electron"]) {
  console.log(`${dependency} v${process.versions[dependency]}`);
}

contextBridge.exposeInMainWorld("electronAPI", {
  // For sending the attract loop path initially to the video renderer via main renderer
  // This is done so that fetch only has to be called once (by selection renderer)
  sendAttractLoopPath: (attractLoopPath) => {
    ipcRenderer.send(
      "attract-loop-path-from-selection-renderer",
      attractLoopPath
    );
  },

  // Similar to above, send the instruction text string initially to the video renderer via main renderer
  // This is done so that fetch only has to be called once (by selection renderer)
  sendInstructionalTextStr: (instructionalTextEnEsObj) => {
    ipcRenderer.send(
      "instruction-text-string-to-video-renderer",
      instructionalTextEnEsObj
    );
  },

  // Send language choices to video renderer via main renderer
  sendAppliedLang: (choice) => {
    ipcRenderer.send("apply-lang-choice-to-video-renderer", choice);
  },

  // For launching a selected video in the video renderer via main renderer
  sendLaunchVideo: (videoPathsObj) => {
    ipcRenderer.send("launch-video", videoPathsObj);
  },

  // For taking action within selection renderer on end of video playback in video renderer
  onVideoEnd: (msg) => {
    ipcRenderer.on("tell-video-end", msg);
  },
});
