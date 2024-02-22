const { contextBridge, ipcRenderer } = require("electron");

// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("electron", {
  env: {
    getNodeEnv: () => ipcRenderer.invoke("get-env-NODE_ENV"),
    getSecretKey: () => ipcRenderer.invoke("get-env-SECRET_KEY"),

    // ----------------------------------------------------------------------------------------------
    // Accept a callback function to be run when main process sends win.webContents.send("env-response")
    // ----------------------------------------------------------------------------------------------
    onEnvResponse: (callback) =>
      ipcRenderer.on("env-response", (event, ...msgs) => {
        callback(...msgs);
      }),
  },
});
