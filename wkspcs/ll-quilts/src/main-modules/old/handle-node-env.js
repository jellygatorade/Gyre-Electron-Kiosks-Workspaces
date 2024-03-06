const { app } = require("electron");
const path = require("path");

// Use dotenv package, ../.env file
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
// console.log(process.env);
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
}

function prepareDev() {
  console.log("initializing for development");

  // Enable live reload
  require("electron-reload")(
    // paths: a file, directory or glob pattern to watch ...seems to accept a single path, or array of paths
    [__dirname, path.join(__dirname, "..")],
    // options, see https://www.npmjs.com/package/electron-reload
    {
      // Provide path to electron package folder from this directory
      electron: require(path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "node_modules/electron"
      )),
    }
  );
}
