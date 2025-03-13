const path = require("node:path");
const config = require("../config.js");

const environment = config.ENV || "production";

// Start chromium with --touch-events flag
// Necessary for use with turn.js which checks for ontouchstart event
// App should be launched in production like:
// $ NODE_ENV=production node app.js
console.log(`config.ENV is: ${environment}`);

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
  console.log("(Initializing for production.)");

  // whatever for production
}

function prepareDev() {
  console.log("(Initializing for development.)");

  // Enable live reload
  require("electron-reload")(
    // paths: a file, directory or glob pattern to watch ...seems to accept a single path, or array of paths
    [path.join(__dirname, "..")],
    // options, see https://www.npmjs.com/package/electron-reload
    {
      // Provide path to electron package folder from this directory
      electron: require(path.join(__dirname, "..", "..", "..", "..", "node_modules/electron")),
      forceHardReset: false, // enables hard reset for every file change and not only the main file
    }
  );
}
