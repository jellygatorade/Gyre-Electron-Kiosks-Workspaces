const ipcMain = require("electron").ipcMain;
const path = require("node:path");
const mailchimp = require("@mailchimp/mailchimp_marketing");

// initialize ----------------------------------------

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.API_SERVER_NAME,
});

// define mailchimp methods --------------------------

async function ping() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

async function getLists() {
  const response = await mailchimp.lists.getAllLists();
  console.log(response);
}

// ipc interfaces ------------------------------------

ipcMain.handle("pingMailchimp", async (event) => {
  await ping();
});

ipcMain.handle("getListsMailchimp", async (event) => {
  await getLists();
});

// Next
// https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
