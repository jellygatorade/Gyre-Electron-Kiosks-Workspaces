const path = require("path");
const ipcMain = require("electron").ipcMain;
const Store = require("./store.js");

// Store setup ------------------------------------------------

const defaults = {
  kiosk_webpage_url: "https://nuxt-gyre-styles.pages.dev",
  local_loading_page: path.join(__dirname, "..", "..", "/pages/loading/index.html"),
  local_config_page: path.join(__dirname, "..", "..", "/pages/config/index.html"),
  test_connection: true,
};

const configJSONStore = new Store.store({
  file_name: "config", // This string will get .json appended to it to become the filename
  save_data: defaults, // Data will be saved underneath this key, defaults are for the first instantiation
  // This data will be appended to or replaced with existing data read by parseDataFile() in store.js
});

// IPC --------------------------------------------------------

ipcMain.on("update-app-config-store-data", function (event, formJSON) {
  // Form data
  configJSONStore.set("kiosk_webpage_url", formJSON?.kiosk_webpage_url);
  configJSONStore.set("test_connection", formJSON?.test_connection);

  // Defaults
  configJSONStore.set("local_loading_page", defaults.local_loading_page);
  configJSONStore.set("local_config_page", defaults.local_config_page);
});

ipcMain.handle("get-app-config-store-data", async (event) => {
  const config = configJSONStore.get();
  return config;
});

ipcMain.handle("get-app-config-form-defaults", async (event) => {
  return defaults;
});

// Exports ----------------------------------------------------

// Expose the instance so that other main process modules may use its .get() or .set() methods
module.exports.configJSONStore = configJSONStore;
