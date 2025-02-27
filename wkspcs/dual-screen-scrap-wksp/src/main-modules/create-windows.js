const { app, BrowserWindow, Menu, globalShortcut, screen } = require("electron");
const path = require("path");

let windows = [];

function create() {
  const displays = screen.getAllDisplays();

  // first window
  windows.push(
    new BrowserWindow({
      x: 50,
      y: 50,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        // preload: path.join(__dirname, "preload.js"),
      },
    })
  );

  // second window
  windows.push(
    new BrowserWindow({
      // if external display is available, create the second window in fullscreen mode on the second display
      // if external display is not available, create a windowed version on the first display
      x: displays?.[1]?.bounds?.x || 50,
      y: displays?.[1]?.bounds?.y || 50,
      fullscreen: displays.length > 1, //
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        // preload: path.join(__dirname, "preload.js"),
      },
    })
  );

  Menu.setApplicationMenu(null); // no application (top bar) menu

  // Shortcuts - App ----------------------------------------------------------

  // relaunch application
  globalShortcut.register("CommandOrControl+0", () => {
    app.relaunch();
    app.exit(0);
  });

  // quit
  globalShortcut.register("ESC", function () {
    app.quit();
  });

  // Shortcuts - Windows ------------------------------------------------------

  // toggle DevTools
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
  });

  // reload page
  globalShortcut.register("CommandOrControl+R", () => {
    BrowserWindow.getFocusedWindow().reload();
  });

  // ignore cache refresh
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    BrowserWindow.getFocusedWindow().reloadIgnoringCache();
  });

  // scale up
  //   globalShortcut.register("CommandOrControl+=", () => {
  //     windows[0].webContents.send("increase-zoom-factor");
  //   });

  // scale down
  //   globalShortcut.register("CommandOrControl+-", () => {
  //     windows[0].webContents.send("decrease-zoom-factor");
  //   });

  // Events -------------------------------------------------------------------

  windows[0].webContents.addListener("did-finish-load", () => {});

  windows[0].webContents.addListener("dom-ready", () => {});

  // Load the initial uri -----------------------------------------------------

  windows[0].loadURL(path.join(__dirname, "..", "pages/index-kiosk.html"));
  windows[1].loadURL(path.join(__dirname, "..", "pages/index-display.html"));
}

function get() {
  return windows;
}

module.exports = { create, get };
