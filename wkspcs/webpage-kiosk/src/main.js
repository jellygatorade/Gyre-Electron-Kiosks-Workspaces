// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");

// Handle ENV requirements
require("./main-modules/handle-config.js");

const appWindows = require("./main-modules/create-window.js");

function onAppReady() {
  appWindows.init(); // creates global keyboard shortcuts
  appWindows.create(); // creates electron.BrowserWindow(s)
  appWindows.loadURIs(); //

  // require modules that depend on appWindow here
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  onAppReady();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      appWindow.create();
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
