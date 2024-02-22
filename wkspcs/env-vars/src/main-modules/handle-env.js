const { ipcMain } = require("electron");

// Use dotenv package, ../.env file
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
// console.log(process.env);

// Get reference to window
const window = require("./create-window.js").get();

ipcMain.handle("get-env-NODE_ENV", (event) => {
  window.webContents.send("env-response", process.env.NODE_ENV);
});

ipcMain.handle("get-env-SECRET_KEY", (event) => {
  window.webContents.send("env-response", process.env.SECRET_KEY);
});
