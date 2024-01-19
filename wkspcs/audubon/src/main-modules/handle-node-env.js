const { app } = require("electron");
const path = require("path");

// Use dotenv package, ../.env file
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
const environment = process.env.NODE_ENV || "production";

// Start chromium with --touch-events flag
// Necessary for use with turn.js which checks for ontouchstart event
// App should be launched in production like:
// $ NODE_ENV=production node app.js
console.log(`process.env.NODE_ENV is: ${environment}`);

if (
  // seems like a place for regex...
  environment !== "d" &&
  environment !== "dev" &&
  environment !== "develop" &&
  environment !== "development"
) {
  prepareProd();
} else {
  prepareDev();
}

function prepareProd() {
  console.log("initializing for production");

  app.commandLine.appendSwitch("touch-events");
}

function prepareDev() {
  console.log("initializing for development");

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
      "..",
      "node_modules/electron"
    )),
  });
}
