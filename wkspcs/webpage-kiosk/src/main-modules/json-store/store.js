const electron = require("electron");
const path = require("path");
const fs = require("fs");

class Store {
  constructor(opts) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    // On Windows for example by default C:\Users\<current user>\AppData\Roaming\<electron app name>
    // Storing user data in the operating system’s designated location for user’s app data is the idiomatic way for native app’s to persist user data because:
    // 1) when we auto-update the app, our source files may get moved or delete, and
    // 2) changing or adding to an app’s internal files will invalidate the code signature
    const userDataPath = getUserDataPath();
    // We'll use the `file_name` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.file_name + ".json");

    // Read and commit existing data to the save_data key of the passed object
    this.data = parseDataFile(this.path, opts.save_data);
  }

  // This will just return the property on the `data` object
  get(key) {
    if (key) {
      return this.data[key];
    } else {
      return this.data;
    }
  }

  // ...and this will set it
  set(key, val) {
    this.data[key] = val;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

// This function simply returns the user data path if another part of the application needs to use it for data storage
function getUserDataPath() {
  const userDataPath = (electron.app || electron.remote.app).getPath("userData");
  return userDataPath;
}

// Previously, the Store class was the only export
//module.exports = Store;

// Expose the Store class
module.exports.store = Store;

// Expose the function getUserDataPath
module.exports.getUserDataPath = getUserDataPath;
