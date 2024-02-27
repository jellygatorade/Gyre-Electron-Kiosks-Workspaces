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
    },
  });

  // No application (top bar) menu
  Menu.setApplicationMenu(null);

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, "..", "/index.html"));

  // Register standard "Control+Shift+I" combo to toggle the DevTools on selection window
  globalShortcut.register("Control+Shift+I", () => {
    window.webContents.toggleDevTools();
  });

  // Register standard "Control+R" combo to reload the page.
  globalShortcut.register("CommandOrControl+R", () => {
    window.webContents.reload();
  });

  // Register shortcut - to home
  globalShortcut.register("Control+1", () => {
    window.loadFile(path.join(__dirname, "..", "/index.html"));
  });

  // Register shortcut
  globalShortcut.register("Control+2", () => {
    window.loadFile(
      path.join(__dirname, "..", "turning-test/index-double-covers.html")
    );
  });

  // Register shortcut
  globalShortcut.register("Control+3", () => {
    window.loadFile(
      path.join(__dirname, "..", "turning-test/index-double-spread-only.html")
    );
  });

  // Register shortcut
  globalShortcut.register("Control+4", () => {
    window.loadFile(
      path.join(__dirname, "..", "turning-test/index-single.html")
    );
  });

  // Register shortcut
  globalShortcut.register("Control+5", () => {
    window.loadFile(
      path.join(__dirname, "..", "turnjs4/samples/magazine/index.html")
    );
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
