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
  email: {
    ping: () => ipcRenderer.invoke("pingMailchimp"),
    getLists: () => ipcRenderer.invoke("getListsMailchimp"),
    getMember: () => ipcRenderer.invoke("getMemberMailchimp"),
    submit: (formJSON) => ipcRenderer.send("submitMailchimp", formJSON),
    /**
     * Accept a callback function to be run when main process sends win.webContents.send("mailchimpResponse")
     *    ipcRenderer - src/mailchimp.js
     */
    onMailchimpResponse: (callback) =>
      ipcRenderer.on("mailchimpResponse", (event, ...msgs) => {
        callback(...msgs);
      }),
  },
});
