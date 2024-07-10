const ipcMain = require("electron").ipcMain;
const Store = require("./store.js");

// Store setup ------------------------------------------------

const configFormDefaults = {
  kiosk_webpage_url: "https://nuxt-gyre-styles.pages.dev",
};

const configJSONStore = new Store.store({
  file_name: "config", // This string will get .json appended to it to become the filename
  save_data: configFormDefaults, // Data will be saved underneath this key
  // The data set here are defaults for the first instantiation
  // This data will be appended to or replaced with existing data read by parseDataFile() in store.js
});

// IPC --------------------------------------------------------

ipcMain.on("update-app-config-store-data", function (event, formJSON) {
  configJSONStore.set("kiosk_webpage_url", formJSON?.kiosk_webpage_url);

  // Send reply back to sender
  // To ensure is-reachable is using the new address
  // event.reply("label-config-updated");
});

ipcMain.handle("get-app-config-store-data", async (event) => {
  const config = configJSONStore.get();
  return config;
});

ipcMain.handle("get-app-config-form-defaults", async (event) => {
  return configFormDefaults;
});

// Exports ----------------------------------------------------

// Expose the instance so that other main process modules may use its .get() or .set() methods
module.exports.configJSONStore = configJSONStore;

// Expose the configFormDefaults so that other main process modules may reset [.set()] the configJSONStore back to defaults
// module.exports.configFormDefaults = configFormDefaults;
