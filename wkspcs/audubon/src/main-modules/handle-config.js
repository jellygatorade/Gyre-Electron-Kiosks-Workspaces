// ---------------------------------------------------
// stand in for enviornment variables ----------------
// ---------------------------------------------------
//
// In lieu of dotenv
//
// https://www.npmjs.com/package/dotenv
// require("dotenv").config();
// const environment = process.env.NODE_ENV || "production";
//
// ---------------------------------------------------

const { app } = require("electron");
const path = require("node:path");
const config = require("../config.js");

const configHandler = {
  init: function () {
    const environment = config.ENV || "production";
    console.log(`config.ENV is: ${environment}`);

    if (this.isDev(environment)) {
      this.prepareProd();
    } else {
      this.prepareDev();
    }
  },

  isDev: function (env) {
    const isDev =
      // seems like a place for regex...
      env !== "d" &&
      env !== "dev" &&
      env !== "develop" &&
      env !== "development";

    return isDev;
  },

  prepareProd: function () {
    console.log("initializing for production");

    // Start chromium with --touch-events flag
    // Necessary for use with turn.js which checks for ontouchstart event
    app.commandLine.appendSwitch("touch-events");
  },

  prepareDev: function () {
    console.log("initializing for development");

    // Enable live reload
    require("electron-reload")(
      // paths: a file, directory or glob pattern to watch ...seems to accept a single path, or array of paths
      [path.join(__dirname, "..")],
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
  },
};

module.exports = configHandler;
