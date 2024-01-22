// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, globalShortcut } = require("electron");

const path = require("path");

// Handle .env variables
require("./main-modules/handle-node-env.js");

let window;
const createWindow = () => {
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
  window.loadFile(path.join(__dirname, "/index.html"));

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
    window.loadFile(path.join(__dirname, "/index.html"));
  });

  // Register shortcut
  globalShortcut.register("Control+2", () => {
    window.loadFile(
      path.join(__dirname, "turning-test/index-double-covers.html")
    );
  });

  // Register shortcut
  globalShortcut.register("Control+3", () => {
    window.loadFile(
      path.join(__dirname, "turning-test/index-double-spread-only.html")
    );
  });

  // Register shortcut
  globalShortcut.register("Control+4", () => {
    window.loadFile(path.join(__dirname, "turning-test/index-single.html"));
  });

  // Register shortcut
  globalShortcut.register("Control+5", () => {
    window.loadFile(
      path.join(__dirname, "turnjs4/samples/magazine/index.html")
    );
  });

  // Register escape key to quit the app
  globalShortcut.register("ESC", function () {
    app.quit();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
