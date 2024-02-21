const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require("path");

const config = require("../config.js");

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
    },
  });

  // No application (top bar) menu
  Menu.setApplicationMenu(null);

  /*********************************************
   * Refer to an external URL for kiosking here
   *********************************************/
  // INSTEAD of loading the index.html of the app -> window.loadFile(path.join(__dirname, "/index.html"));
  // Call the .loadURL() method to load a remote web address
  window.loadURL(config.KIOSK_WEBPAGE_URL);
  //   window.loadURL(path.join(__dirname, "..", "/index.html")); // local page

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
