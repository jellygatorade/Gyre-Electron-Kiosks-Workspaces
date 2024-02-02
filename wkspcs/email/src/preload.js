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
    getFileManagerFolders: () =>
      ipcRenderer.invoke("getFileManagerFoldersMailchimp"),
    getMember: (formJSON) => ipcRenderer.invoke("getMemberMailchimp", formJSON),
    addMember: (formJSON) => ipcRenderer.invoke("addMemberMailchimp", formJSON),
    updateMergeFields: (formJSON) =>
      ipcRenderer.invoke("updateMergeFieldsMailchimp", formJSON),
    getMemberTags: (formJSON) =>
      ipcRenderer.invoke("getMemberTagsMailchimp", formJSON),
    updateMemberTags: (formJSON) =>
      ipcRenderer.invoke("updateMemberTagsMailchimp", formJSON),
    addFile: (formJSON) => ipcRenderer.invoke("addFileMailchimp", formJSON),
    submit: (formJSON) => ipcRenderer.invoke("submitMailchimp", formJSON),
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
