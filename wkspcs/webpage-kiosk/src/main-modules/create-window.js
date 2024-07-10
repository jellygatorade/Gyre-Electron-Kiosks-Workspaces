const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require("path");

const { configJSONStore } = require("./json-store/config-store.js");
const config = require("../config.js");

const Navigator = require("./navigator.js");
const NetworkTester = require("./network-tester/network-tester.js");

let window;

function create() {
  window = new BrowserWindow({
    x: 50,
    y: 50,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null); // no application (top bar) menu

  Navigator.win = window;

  window.loadURL(config.LOCAL_LOADING_PAGE);

  // Shortcuts ------------------------------------------------

  // relaunch application
  globalShortcut.register("CommandOrControl+0", () => {
    app.relaunch();
    app.exit(0);
  });

  // toggle DevTools
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    window.webContents.toggleDevTools();
  });

  // reload page
  globalShortcut.register("CommandOrControl+R", () => {
    window.webContents.reload();
  });

  // quit
  globalShortcut.register("ESC", function () {
    app.quit();
  });

  // navigate
  globalShortcut.register("CommandOrControl+1", function () {
    Navigator.goTo({ uri: configJSONStore.get("kiosk_webpage_url") });
  });

  // navigate
  globalShortcut.register("CommandOrControl+2", function () {
    Navigator.goTo({ uri: config.LOCAL_CONFIG_PAGE });
  });

  // navigate
  globalShortcut.register("CommandOrControl+3", function () {
    Navigator.goTo({ uri: config.LOCAL_LOADING_PAGE });
  });

  // Events ---------------------------------------------------

  window.webContents.addListener("did-finish-load", () => {
    // if window location is the web kiosk, or the loading page, run the connection tester
    // if on the config page stop the tester

    const uri = window.webContents.getURL();
    const isWeb = uri.startsWith("http://") || uri.startsWith("https://");

    if (isWeb || uri.includes("loading")) {
      NetworkTester.start();
    } else {
      NetworkTester.stop();
    }
  });
}

function get() {
  return window;
}

module.exports = { create, get };
