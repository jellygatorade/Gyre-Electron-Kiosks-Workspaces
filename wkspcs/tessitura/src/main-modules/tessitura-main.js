const ipcMain = require("electron").ipcMain;
const path = require("node:path");

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
  // note uses search type advanced
  await getTessitura(`CRM/Constituents/Search`, `?type=advanced&atype=Email&op=Like&value=${email_string}`);
}

async function searchConstituentsByName(fname_string, lname_string) {
  // note uses search type basic
  await getTessitura(`CRM/Constituents/Search`, `?type=basic&fn=${fname_string}&ln=${lname_string}`);
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

ipcMain.handle("Tessitura-searchConstituentsByName", async (event, fname_string, lname_string) => {
  await searchConstituentsByName(fname_string, lname_string);
});
