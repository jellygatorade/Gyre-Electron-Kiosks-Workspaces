const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require("path");

let win;

function create() {
  // Create the browser window.
  win = new BrowserWindow({
    // width: 800,
    // height: 600,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "..", "preload.js"),
    },
  });

  // No application (top bar) menu
  Menu.setApplicationMenu(null);

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "..", "/index.html"));

  // Register standard "Control+Shift+I" combo to toggle the DevTools on selection window
  globalShortcut.register("Control+Shift+I", () => {
    win.webContents.toggleDevTools();
  });

  // Register standard "Control+R" combo to reload the page.
  globalShortcut.register("CommandOrControl+R", () => {
    win.webContents.reload();
  });

  // Register escape key to quit the app
  globalShortcut.register("ESC", function () {
    app.quit();
  });
}

function get() {
  return win;
}

module.exports = { create, get };
