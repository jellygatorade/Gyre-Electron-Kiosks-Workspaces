const { app, BrowserWindow, Menu, globalShortcut, screen, ipcMain } = require("electron");
const path = require("path");

const { configJSONStore } = require("./json-store/config-store.js");
const Navigator = require("./navigator.js");
const NetworkTester = require("./network-tester/network-tester.js");

let windows = [];
let new_windows_on_recreate = [];
let uri_loaded_counter = 0;

// Core methods (init, create, loadURIs, get) ---------------------------------

function init() {
  Menu.setApplicationMenu(null); // no application (top bar) menu

  Navigator.windows = windows; // inject window depedency

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
    BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
  });

  // scale up
  globalShortcut.register("CommandOrControl+=", () => {
    const focused_window = BrowserWindow.getFocusedWindow();
    const window_index = windows.indexOf(focused_window);
    focused_window.webContents.send("increase-zoom-factor", window_index);
  });

  // scale down
  globalShortcut.register("CommandOrControl+-", () => {
    const focused_window = BrowserWindow.getFocusedWindow();
    const window_index = windows.indexOf(focused_window);
    focused_window.webContents.send("decrease-zoom-factor", window_index);
  });

  // navigate
  globalShortcut.register("CommandOrControl+1", function () {
    Navigator.setState({ state: Navigator.states.live });
  });

  // navigate
  globalShortcut.register("CommandOrControl+2", function () {
    Navigator.setState({ state: Navigator.states.config });
  });

  // navigate
  globalShortcut.register("CommandOrControl+3", function () {
    Navigator.setState({ state: Navigator.states.loading });
  });
}

function create({ initial_creation }) {
  const OS_displays = screen.getAllDisplays();
  const app_config_quantity_displays = parseInt(configJSONStore.get("quantity_displays"));

  // close windows if more open than requested per app_config
  // this is never true on initialization
  while (windows.length > app_config_quantity_displays) {
    windows[windows.length - 1].destroy();
  }

  // loop from windows.length (existing windows) to app_config_quantity_displays (total needed)
  for (let i = windows.length; i < app_config_quantity_displays; i++) {
    const new_window = new BrowserWindow({
      // if external display is available, create the second window in fullscreen mode on the second display
      // if external display is not available, create a windowed version on the first display
      x: OS_displays?.[i]?.bounds?.x || 50,
      y: OS_displays?.[i]?.bounds?.y || 50,
      fullscreen: i > 0 ? OS_displays.length > i : true, // first display always fullscreen, rest are dependent on if other OS_displays exist
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, "preload.js"),
      },
    });

    // remove from windows array when closed
    new_window.on("closed", () => {
      console.log(`(Closing a window, window id: ${new_window.id})`);
      const index = windows.indexOf(new_window);
      if (index > -1) {
        windows.splice(index, 1);
      }
    });

    // start network tester when all windows 'did-finish-load'
    new_window.webContents.addListener("did-finish-load", () => {
      uri_loaded_counter++;
      if (uri_loaded_counter === windows.length) {
        uri_loaded_counter = 0;
        startNetworkTester();
      }
    });

    // pass config zoom factor to each new browser window when 'dom-ready'
    new_window.webContents.addListener("dom-ready", () => {
      new_window.webContents.send("init-zoom-factor", configJSONStore.get("browser_zoom_factors")[i] || 1); // use stored preference or default to 1
    });

    windows.push(new_window);
    if (!initial_creation) new_windows_on_recreate.push(new_window); // if not the first time - this array could easily be returned instead of being defined globally
  }

  // Event handlers -------------------------------------------

  function startNetworkTester() {
    if (configJSONStore.get("test_connection")) {
      // Use NetworkTester on web kiosk or the loading page
      // Stop NetworkTester on config page

      const URIs = [];
      windows.forEach((win) => URIs.push(win.webContents.getURL()));

      let NetworkTester_isNeeded = false;
      URIs.forEach((uri) => {
        const isWeb = uri.startsWith("http://") || uri.startsWith("https://");
        NetworkTester_isNeeded = isWeb || uri.includes("loading"); // use NetworkTester on webpages or the loading page
      });

      if (NetworkTester_isNeeded) {
        NetworkTester.start();
      } else {
        NetworkTester.stop();
      }
    } else {
      console.log(`(Not initializing network tests per user configuration)`);
    }
  }
}

function loadURIs() {
  // load the initial uri (called in main.js)
  if (configJSONStore.get("test_connection")) {
    windows.forEach((win) => win.loadURL(configJSONStore.get("local_loading_page")));
  } else {
    windows.forEach((win) => win.loadURL(configJSONStore.get("kiosk_webpage_url")));
  }
}

function get() {
  return windows;
}

// ipcMain handlers -----------------------------------------------------------

// new zoom factor
ipcMain.on("update-app-config-zoom-factor", function (_event, zoom_factor, window_index) {
  console.log(`(Changed zoom factor for windows[${window_index}]: ${zoom_factor})`);

  const browser_zoom_factors = configJSONStore.get("browser_zoom_factors");
  browser_zoom_factors[window_index] = zoom_factor;

  configJSONStore.set("browser_zoom_factors", browser_zoom_factors);
  windows[0].webContents.send("new-zoom-factor", zoom_factor, window_index); // send to primary window renderer for changing value in form
});

// IPC ping pong communication is how new change in window quantity is handled (for now)
// ipcMain handles "update-app-config-store-data" in config-store.js
// Then, ipcMain sends a reply to the ipcRenderer "app-config-updated"
// Upon which ipcRenderer invokes "recreate-windows" (along with "reset-test-connection-task")
// ... This prevents dealing with a circular dependency in main process
// ... See dev note about "app-config-updated" in config-store.js
ipcMain.handle("recreate-windows", (event) => {
  create({ initial_creation: false });

  // Set newly created windows to config page
  new_windows_on_recreate.forEach((win) => win.loadURL(configJSONStore.get("local_config_page_secondary")));
  new_windows_on_recreate.length = 0; // clear the list of recently created windows
});

// Exports --------------------------------------------------------------------

module.exports = { init, create, loadURIs, get };
