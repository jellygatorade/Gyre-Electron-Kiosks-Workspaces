const { contextBridge, ipcRenderer, webFrame } = require("electron");

/**
 * Receives an event.reply back from the main process after it
 * has handled an invocation of "update-app-config-store-data"
 * Used to invoke "reset-test-connection-task" after app config2
 * gets updated
 */
ipcRenderer.on("app-config-updated", function (_event, res) {
  ipcRenderer.invoke("reset-test-connection-task");
  ipcRenderer.invoke("recreate-windows");
});

// Zoom factor ------------------------------------------------

ipcRenderer.on("init-zoom-factor", function (_event, scale) {
  webFrame.setZoomFactor(scale);
});

ipcRenderer.on("increase-zoom-factor", (_event) => {
  let zoom = webFrame.getZoomFactor();
  zoom = zoom + 0.1;
  zoom = round(zoom, 1); // round to nearest tenth
  webFrame.setZoomFactor(zoom);
  ipcRenderer.send("update-app-config-zoom-factor", zoom);
});

ipcRenderer.on("decrease-zoom-factor", (_event) => {
  let zoom = webFrame.getZoomFactor();
  zoom = zoom - 0.1;
  zoom = round(zoom, 1); // round to nearest tenth
  webFrame.setZoomFactor(zoom);
  ipcRenderer.send("update-app-config-zoom-factor", zoom);
});

// Expose window props ----------------------------------------

contextBridge.exposeInMainWorld("electron", {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },

  isKiosk: true,

  appConfig: {
    update: (formJSON) => ipcRenderer.send("update-app-config-store-data", formJSON),
    request: () => ipcRenderer.invoke("get-app-config-store-data"), // async
    getDefaults: () => ipcRenderer.invoke("get-app-config-form-defaults"), // async
    // resetDefaults: () => ipcRenderer.invoke("reset-app-config-defaults"),
    //
    /**
     * Accepts a callback function to be run when main process sends
     * win.webContents.send("new-zoom-factor", zoom_factor);
     * or
     * event.reply("new-zoom-factor", zoom_factor);
     *    ipcMain - src/main-modules/json-store/config-store.js
     *    ipcRenderer - src/pages/config/script.js
     */
    onNewZoomFactor: (callback) =>
      ipcRenderer.on("new-zoom-factor", (_event, value) => {
        callback(value);
      }),
  },
});

// Helpers ----------------------------------------------------

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
