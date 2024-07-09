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
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // No application (top bar) menu
  Menu.setApplicationMenu(null);

  // Register "Control+0" combo to relaunch the application.
  globalShortcut.register("CommandOrControl+0", () => {
    app.relaunch();
    app.exit(0);
  });

  // Register standard "Control+Shift+I" combo to toggle the DevTools on selection window
  globalShortcut.register("CommandOrControl+Shift+I", () => {
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

  // load a local file --- window.loadFile(path.join(__dirname, "/index.html")
  // load a remote web address --- window.loadURL(config.KIOSK_WEBPAGE_URL)
  window.loadURL(config.LOCAL_LOADING_PAGE);
  window.pageState = "loading";

  // Register ctrl (or command) + 1 key combo to switch html docs
  globalShortcut.register("CommandOrControl+1", function () {
    if (window.pageState !== "prod_webpage") {
      window.loadURL(config.KIOSK_WEBPAGE_URL);
      window.pageState = "prod_webpage";
    }
  });

  // Register ctrl (or command) + 2 key combo to switch html docs
  globalShortcut.register("CommandOrControl+2", function () {
    if (window.pageState !== "config") {
      window.loadURL(config.LOCAL_CONFIG_PAGE);
      window.pageState = "config";
    }
  });

  // Register ctrl (or command) + 3 key combo to switch html docs
  globalShortcut.register("CommandOrControl+3", function () {
    if (window.pageState !== "loading") {
      window.loadURL(config.LOCAL_LOADING_PAGE);
      window.pageState = "loading";
    }
  });
}

function get() {
  return window;
}

module.exports = { create, get };
