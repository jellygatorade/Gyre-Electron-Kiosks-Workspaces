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

// // Enable live reload for all the files inside your project directory for Electron too
// // https://ourcodeworld.com/articles/read/524/how-to-use-live-reload-in-your-electron-project
// require("electron-reload")(__dirname, {
//   // Note that the path to electron may vary according to the main file
//   // Here we go up several levels to find the electron package folder
//   electron: require(path.join(
//     __dirname,
//     "..",
//     "..",
//     "..",
//     "node_modules/electron"
//   )),
// });

let selectionWindow, videoWindow;
const createWindows = () => {
  const displays = screen.getAllDisplays();
  //console.log(displays);
  const firstExternalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  // Create the selection window
  selectionWindow = new BrowserWindow({
    x: 50,
    y: 50,
    fullscreen: true,
    // width: 800,
    // height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(
        __dirname,
        "/SelectionView/script/preload-selection-view.js"
      ),
    },
  });

  // and load the index.html of the app.
  selectionWindow.loadFile(path.join(__dirname, "/SelectionView/index.html"));

  // Register standard "Control+Shift+I" combo to toggle the DevTools on selection window
  globalShortcut.register("Control+Shift+I", () => {
    selectionWindow.webContents.toggleDevTools();
  });

  if (firstExternalDisplay) {
    // If external display is available, create the video window in fullscreen mode on the second display
    videoWindow = new BrowserWindow({
      x: firstExternalDisplay.bounds.x,
      y: firstExternalDisplay.bounds.y,
      fullscreen: true,
      // width: 800,
      // height: 600,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(
          __dirname,
          "/VideoView/script/preload-video-view.js"
        ),
      },
    });

    // and load the index.html of the app.
    videoWindow.loadFile(path.join(__dirname, "/VideoView/index.html"));

    // Register nonstandard "Control+Shift+O" combo to toggle the DevTools on video window
    globalShortcut.register("Control+Shift+O", () => {
      videoWindow.webContents.toggleDevTools();
    });
  } else {
    // If external display is not available, create a windowed video on the first display
    videoWindow = new BrowserWindow({
      x: 50,
      y: 50,
      fullscreen: false,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(
          __dirname,
          "/VideoView/script/preload-video-view.js"
        ),
      },
    });

    // and load the index.html of the app.
    videoWindow.loadFile(path.join(__dirname, "/VideoView/index.html"));

    // Register nonstandard "Control+Shift+O" combo to toggle the DevTools on video window
    globalShortcut.register("Control+Shift+O", () => {
      videoWindow.webContents.toggleDevTools();
    });
  }

  // No application (top bar) menu
  Menu.setApplicationMenu(null);

  // Register escape key to quit the app
  globalShortcut.register("ESC", function () {
    app.quit();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindows();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindows();
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

/* Begin IPC main fns to pass data between renderers */

function sendAttractLoopPathToVideoRenderer(event, attractLoopPath) {
  videoWindow.webContents.send(
    "attract-loop-path-to-video-renderer",
    attractLoopPath
  );
}
ipcMain.on(
  "attract-loop-path-from-selection-renderer",
  sendAttractLoopPathToVideoRenderer
);

function sendInstructionTextToVideoRenderer(event, instructionalTextEnEsObj) {
  videoWindow.webContents.send(
    "instruction-text-string-to-video-renderer",
    instructionalTextEnEsObj
  );
}
ipcMain.on(
  "instruction-text-string-to-video-renderer",
  sendInstructionTextToVideoRenderer
);

function applyLangToVideoRenderer(event, choice) {
  videoWindow.webContents.send("apply-lang-choice-to-video-renderer", choice);
}
ipcMain.on("apply-lang-choice-to-video-renderer", applyLangToVideoRenderer);

function launchVideoView(event, videoPathsObj) {
  videoWindow.webContents.send("use-video-path", videoPathsObj);
}
ipcMain.on("launch-video", launchVideoView);

function tellSelectionVideoEnd(event, msg) {
  selectionWindow.webContents.send("tell-video-end", msg);
}
ipcMain.on("video-end", tellSelectionVideoEnd);

/* End IPC main fns to pass data between renderers */
