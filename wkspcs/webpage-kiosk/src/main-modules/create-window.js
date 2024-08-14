const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require("path");

const { configJSONStore } = require("./json-store/config-store.js");

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

  Navigator.win = window; // inject window depedency

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
    Navigator.goTo({ uri: configJSONStore.get("local_config_page") });
  });

  // navigate
  globalShortcut.register("CommandOrControl+3", function () {
    Navigator.goTo({ uri: configJSONStore.get("local_loading_page") });
  });

  // Events ---------------------------------------------------

  window.webContents.addListener("did-finish-load", () => {
    if (configJSONStore.get("test_connection")) {
      // Use NetworkTester on web kiosk or the loading page
      // Stop NetworkTester on config page

      const uri = window.webContents.getURL();
      const isWeb = uri.startsWith("http://") || uri.startsWith("https://");

      if (isWeb || uri.includes("loading")) {
        NetworkTester.start();
      } else {
        NetworkTester.stop();
      }
    } else {
      console.log(`(Not initializing network tests per user configuration)`);
    }
  });

  // Load the initial uri -------------------------------------

  if (configJSONStore.get("test_connection")) {
    window.loadURL(configJSONStore.get("local_loading_page"));
  } else {
    window.loadURL(configJSONStore.get("kiosk_webpage_url"));
  }
}

function get() {
  return window;
}

module.exports = { create, get };
