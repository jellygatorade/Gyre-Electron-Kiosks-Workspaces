const path = require("path");
const ipcMain = require("electron").ipcMain;
const Store = require("./store.js");

// const getWindows = require("../create-window.js").get;

// Store setup ------------------------------------------------

const defaults = {
  quantity_displays: 1,
  kiosk_webpage_urls: ["https://ncma-kiosks.pages.dev/"],
  local_loading_page: path.join(__dirname, "..", "..", "/pages/loading/index.html"),
  local_config_page: path.join(__dirname, "..", "..", "/pages/config/index.html"),
  local_config_page_secondary: path.join(__dirname, "..", "..", "/pages/config/index-secondary.html"), // secondary displays get a placeholder page when the kiosk is in config state
  browser_zoom_factors: [1.0],
  test_connection: true,
  test_connection_interval: 60,
};

const configJSONStore = new Store.store({
  file_name: "config", // This string will get .json appended to it to become the filename
  save_data: defaults, // Data will be saved underneath this key, defaults are for the first instantiation
  // This data will be appended to or replaced with existing data read by parseDataFile() in store.js
});

// IPC --------------------------------------------------------

ipcMain.on("update-app-config-store-data", function (_event, formJSON) {
  // Form data
  configJSONStore.set("quantity_displays", formJSON?.quantity_displays);
  configJSONStore.set("kiosk_webpage_urls", formJSON?.kiosk_webpage_urls);
  configJSONStore.set("browser_zoom_factors", formJSON?.browser_zoom_factors);
  configJSONStore.set("test_connection", formJSON?.test_connection);
  configJSONStore.set("test_connection_interval", formJSON?.test_connection_interval);

  // Defaults
  configJSONStore.set("local_loading_page", defaults.local_loading_page);
  configJSONStore.set("local_config_page", defaults.local_config_page);
  configJSONStore.set("local_config_page_secondary", defaults.local_config_page_secondary);

  // Send reply back to sender
  // This is used to ensure intervalTask is updated to reflect a new "test_connection_interval" value
  _event.reply("app-config-updated");

  // ADD ON_APP_CONFIG_UPDATED() function
  // update_displays - create windows or destroy unecessary windows
  // circular dependency between config-store.js and create-window.js ?
});

// MOVED TO CREATE-WINDOW FOR ACCESS TO THE WINDOWS ARRAY
// ipcMain.on("update-app-config-zoom-factor", function (_event, zoom_factor, window_index) {
//   console.log(`(Changed zoom factor for windows[${window_index}]: ${zoom_factor})`);

//   // const quantity_displays = configJSONStore.get("quantity_displays");
//   const browser_zoom_factors = configJSONStore.get("browser_zoom_factors");
//   // let browser_zoom_factors = [];

//   // for (let i = 0; i < quantity_displays; i++) {
//   //   browser_zoom_factors.push(zoom_factor);
//   // }
//   browser_zoom_factors[window_index] = zoom_factor;

//   configJSONStore.set("browser_zoom_factors", browser_zoom_factors);
//   // _event.reply("new-zoom-factor", zoom_factor, window_index); // send back to renderer for changing value in form

//   // // TESTING
//   // const windows = getWindows();
//   // windows[0].webContents.send("new-zoom-factor", zoom_factor, window_index);
// });

ipcMain.handle("get-app-config-store-data", async (_event) => {
  const config = configJSONStore.get();
  return config;
});

ipcMain.handle("get-app-config-form-defaults", async (_event) => {
  return defaults;
});

// Exports ----------------------------------------------------

// Expose the instance so that other main process modules may use its .get() or .set() methods
module.exports.configJSONStore = configJSONStore;
