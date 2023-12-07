// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  globalShortcut,
  screen,
} = require("electron");
const path = require("path");

// Enable live reload for all the files inside your project directory for Electron too
// https://ourcodeworld.com/articles/read/524/how-to-use-live-reload-in-your-electron-project
require("electron-reload")(__dirname, {
  // Note that the path to electron may vary according to the main file
  // Here we go up several levels to find the electron package folder
  electron: require(path.join(
    __dirname,
    "..",
    "..",
    "..",
    "node_modules/electron"
  )),
});

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

  // Register
  globalShortcut.register("Control+1", () => {
    window.loadFile(path.join(__dirname, "/index.html"));
  });

  // Register
  globalShortcut.register("Control+2", () => {
    window.loadFile(path.join(__dirname, "turning-test/index.html"));
  });

  // Register
  globalShortcut.register("Control+3", () => {
    window.loadFile(
      path.join(__dirname, "turnjs4/samples/magazine/index.html")
    );
  });

  // Register escape key to quit the app
  globalShortcut.register("ESC", function () {
    app.quit();
  });
};

// Start chromium with --touch-events flag
// Necessary for use with turn.js which checks for ontouchstart event
// app.commandLine.appendSwitch("touch-events");

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
