const ipcMain = require("electron").ipcMain;
const fsPromises = require("node:fs/promises");
const path = require("node:path");
const { customAlphabet } = require("nanoid");
const crypto = require("crypto");

// Get reference to window
const win = require("./create-window.js").get();

// ---------------------------------------------------
// initialize ----------------------------------------
// ---------------------------------------------------

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const tessitura_api = {
  base_uri: process.env.TESS_API_BASE_URI,
  username: process.env.TESS_API_USER,
  password: process.env.TESS_API_PASS,
};

// ---------------------------------------------------
// generic tessiutura GET ----------------------------
// ---------------------------------------------------

async function getTessitura(endpoint, querystring) {
  const headers = new Headers();

  headers.append("Authorization", "Basic " + Buffer.from(tessitura_api.username + ":" + tessitura_api.password).toString("base64"));

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  let response = {};
  let result = {};

  if (!querystring) querystring = "";

  try {
    response = await fetch(`${tessitura_api.base_uri}/${endpoint}${querystring}`, requestOptions);
    result = await response.json();
    win.webContents.send("Tessitura-response", result);
  } catch (error) {
    handleError(error);
  }

  return response;
}

// ---------------------------------------------------
// implement tessitura endpoints ---------------------
// ---------------------------------------------------

async function ping() {
  await getTessitura(`Diagnostics/Status`);
}

async function getConstituents(ids_string) {
  await getTessitura(`CRM/Constituents`, `?constituentIds=${ids_string}`);
}

async function getElectronicAddresses(ids_string) {
  await getTessitura(`CRM/ElectronicAddresses`, `?constituentIds=${ids_string}`);
}

async function getContactPermissions(ids_string) {
  await getTessitura(`CRM/ContactPermissions`, `?constituentId=${ids_string}`);
}

async function searchConstituentsByEmail(email_string) {
  await getTessitura(`CRM/Constituents/Search`, `?type=advanced&atype=Email&op=Like&value=${email_string}`);
}

// ---------------------------------------------------
// helper functions ----------------------------------
// ---------------------------------------------------

function handleError(error) {
  // Do something with Tessitura errors
  // Dump to logfile?
  console.log(error);
  win.webContents.send("Tessitura-response", `Tessitura error: ${error}`);
}

function getMD5string(string) {
  const hash = crypto
    .createHash("md5")
    .update(string) // email string
    .digest("hex");

  return hash;
}

async function readFile(path) {
  const file_buffer = await fsPromises.readFile(path);
  const contents_in_base64 = file_buffer.toString("base64"); // encode file contents into base64

  return contents_in_base64;
}

function getFormattedDate() {
  // Create a date object from a date string
  const date = new Date();

  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy_mm_dd date string
  const formattedDate = year + "_" + month + "_" + day;
  return formattedDate;
}

function isWithinLastMinutes(timestamp, minutes) {
  const parsed_timestamp = Date.parse(timestamp);
  const minutes_ago = Date.parse(new Date(Date.now() - 1000 * 60 * minutes));

  let date_diff = minutes_ago - parsed_timestamp;

  if (date_diff > 0) {
    return false; // greater than x minutes ago
  } else {
    return true; // within x minutes ago
  }
}

const nanoid = customAlphabet("1234567890abcdef", 6); // returns a function that returns 6 char randomized alphanumeric string

// ---------------------------------------------------
// ipc listeners -------------------------------------
// ---------------------------------------------------

ipcMain.handle("Tessitura-ping", async (event) => {
  await ping();
});

ipcMain.handle("Tessitura-getConstituents", async (event, ids_string) => {
  await getConstituents(ids_string);
});

ipcMain.handle("Tessitura-getElectronicAddresses", async (event, ids_string) => {
  await getElectronicAddresses(ids_string);
});

ipcMain.handle("Tessitura-getContactPermissions", async (event, id_string) => {
  await getContactPermissions(id_string);
});

ipcMain.handle("Tessitura-searchConstituentsByEmail", async (event, email_string) => {
  await searchConstituentsByEmail(email_string);
});
