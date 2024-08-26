const { contextBridge, ipcRenderer } = require("electron");

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
  tessitura: {
    ping: () => ipcRenderer.invoke("Tessitura-ping"),
    getConstituents: (ids_string) => ipcRenderer.invoke("Tessitura-getConstituents", ids_string),
    getElectronicAddresses: (ids_string) => ipcRenderer.invoke("Tessitura-getElectronicAddresses", ids_string),
    getContactPermissions: (id_string) => ipcRenderer.invoke("Tessitura-getContactPermissions", id_string),
    searchConstituentsByEmail: (email_string) => ipcRenderer.invoke("Tessitura-searchConstituentsByEmail", email_string),
    searchConstituentsByName: (fname_string, lname_string) => ipcRenderer.invoke("Tessitura-searchConstituentsByName", fname_string, lname_string),
    /**
     * Accept a callback function to be run when main process sends win.webContents.send("tessituraResponse")
     *    ipcRenderer - src/mailchimp.js
     */
    onResponse: (callback) =>
      ipcRenderer.on("Tessitura-response", (event, ...msgs) => {
        callback(...msgs);
      }),
  },
});
