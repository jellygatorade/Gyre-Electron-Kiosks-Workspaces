const { contextBridge, ipcRenderer } = require("electron");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
for (const dependency of ["chrome", "node", "electron"]) {
  console.log(`${dependency} v${process.versions[dependency]}`);
}

contextBridge.exposeInMainWorld("electronAPI", {
  // For receiving the attract loop path initially from the selection renderer via main renderer
  onAttractLoopPathReceived: (attractLoopPath) => {
    ipcRenderer.on("attract-loop-path-to-video-renderer", attractLoopPath);
  },

  // For receiving the instructional text string initially from the selection renderer via main renderer
  onInstructionTextStrReceived: (instructionalTextEnEsObj) => {
    ipcRenderer.on(
      "instruction-text-string-to-video-renderer",
      instructionalTextEnEsObj
    );
  },

  onLangReceived: (choice) => {
    ipcRenderer.on("apply-lang-choice-to-video-renderer", choice);
  },

  // For launching a selected video from the selection renderer via main renderer
  onLaunchVideo: (videoPathsObj) => {
    ipcRenderer.on("use-video-path", videoPathsObj);
  },

  // For telling the main renderer a video has ended
  sendVideoEnd: (msg) => {
    ipcRenderer.send("video-end", msg);
  },
});
