const { contextBridge, ipcRenderer } = require("electron");

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
