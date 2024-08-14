const { contextBridge, ipcRenderer } = require("electron");

/**
 * Receives an event.reply back from the main process after it
 * has handled an invocation of "update-app-config-store-data"
 * Used to invoke "recurringFetch" after labelConfig gets updated
 */
ipcRenderer.on("app-config-updated", function (event, res) {
  ipcRenderer.invoke("reset-test-connection-task");
});

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
  },
});
