const path = require("path");
const ipcMain = require("electron").ipcMain;
const Store = require("./store.js");

// Store setup ------------------------------------------------

const defaults = {
  kiosk_webpage_url: "https://nuxt-gyre-styles.pages.dev",
  local_loading_page: path.join(__dirname, "..", "..", "/pages/loading/index.html"),
  local_config_page: path.join(__dirname, "..", "..", "/pages/config/index.html"),
  browser_zoom_factor: 1.0,
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
  configJSONStore.set("kiosk_webpage_url", formJSON?.kiosk_webpage_url);
  configJSONStore.set("browser_zoom_factor", formJSON?.browser_zoom_factor);
  configJSONStore.set("test_connection", formJSON?.test_connection);
  configJSONStore.set("test_connection_interval", formJSON?.test_connection_interval);

  // Defaults
  configJSONStore.set("local_loading_page", defaults.local_loading_page);
  configJSONStore.set("local_config_page", defaults.local_config_page);

  // Send reply back to sender
  // This is used to ensure intervalTask is updated to reflect a new "test_connection_interval" value
  _event.reply("app-config-updated");
});

ipcMain.on("update-app-config-zoom-factor", function (_event, zoom_factor) {
  console.log(`(Changed zoom factor: ${zoom_factor})`);
  configJSONStore.set("browser_zoom_factor", zoom_factor);
  _event.reply("new-zoom-factor", zoom_factor); // send back to renderer for changing value in form
});

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
