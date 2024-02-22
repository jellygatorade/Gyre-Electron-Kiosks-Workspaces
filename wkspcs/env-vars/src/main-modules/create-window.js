const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require("path");

let window;

function create() {
  // Create the window
  window = new BrowserWindow({
    x: 50,
    y: 50,
    fullscreen: true,
    // width: 800,
    // height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "..", "preload.js"),
    },
  });

  // No application (top bar) menu
  Menu.setApplicationMenu(null);

  window.loadURL(path.join(__dirname, "..", "page", "index.html")); // local page

  // Register standard "Control+Shift+I" combo to toggle the DevTools on selection window
  globalShortcut.register("Control+Shift+I", () => {
    window.webContents.toggleDevTools();
  });

  // Register standard "Control+R" combo to reload the page.
  globalShortcut.register("CommandOrControl+R", () => {
    window.webContents.reload();
  });

  // Register escape key to quit the app
  globalShortcut.register("ESC", function () {
    app.quit();
  });
}

function get() {
  return window;
}

module.exports = { create, get };
