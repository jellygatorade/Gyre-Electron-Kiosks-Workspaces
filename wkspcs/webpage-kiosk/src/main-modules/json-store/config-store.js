const ipcMain = require("electron").ipcMain;
const Store = require("./store.js");

ipcMain.on("update-app-config-store-data", function (event, formJSON) {
  configJSONStore.set("kiosk_webpage_url", formJSON?.kiosk_webpage_url);

  // Send reply back to sender
  // To ensure is-reachable is using the new address
  // event.reply("label-config-updated");
});

ipcMain.handle("get-app-config-store-data", async (event) => {
  // .get() method only works for keys underneath "save_data", so get() each key
  const config = {
    kiosk_webpage_url: configJSONStore.get("kiosk_webpage_url"),
  };

  return config;
});

// Add an IPC channel that will pass the label config defaults
// This is used by a function that resets the application to default state
ipcMain.handle("get-app-config-form-defaults", async (event) => {
  return configFormDefaults;
});

const configFormDefaults = {
  kiosk_webpage_url: "https://nuxt-gyre-styles.pages.dev",
};

// Initialize instance of Store class that will handle storage and retrieval of JSON application data
const configJSONStore = new Store.store({
  file_name: "config", // This string will get .json appended to it to become the filename
  save_data: configFormDefaults, // Data will be saved underneath this key
  // The data set here are defaults for the first instantiation
  // This data will be appended to or replaced with existing data read by parseDataFile() in store.js
});

// Expose the instance so that other main process modules may use its .get() or .set() methods
module.exports.configJSONStore = configJSONStore;

// Expose the configFormDefaults so that other process modules may reset [.set()] the configJSONStore back to defaults
module.exports.configFormDefaults = configFormDefaults;
