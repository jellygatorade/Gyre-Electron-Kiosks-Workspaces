const { app } = require("electron");

// Use dotenv package, ../.env file
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
const environment = process.env.NODE_ENV || "development";

// Start chromium with --touch-events flag
// Necessary for use with turn.js which checks for ontouchstart event
// App should be launched in production like:
// $ NODE_ENV=production node app.js
console.log(`process.env.NODE_ENV is: ${environment}`);

if (
  // seems like a place for regex...
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
}
