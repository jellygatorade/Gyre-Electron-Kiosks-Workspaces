// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("node:path");

// Enable live reload for all the files inside your project directory for Electron too
require("electron-reload")(__dirname, {
  // Note that the path to electron may vary according to the main file
  // Here we go up several levels to find the electron package folder
  electron: require(path.join(__dirname, "..", "..", "..", "node_modules/electron")),
});

const appWindow = require("./main-modules/create-window.js");

function onAppReady() {
  appWindow.create(); // creates electron.BrowserWindow and global keyboard shortcuts

  // Setup Mailchimp - depends on appWindow.get()
  require("./main-modules/tessitura-main.js");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  onAppReady();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
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
