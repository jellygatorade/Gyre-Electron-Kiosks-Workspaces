const ipcMain = require("electron").ipcMain;
const path = require("node:path");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const crypto = require("crypto");

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

async function getMember() {
  let subscriber_hash = crypto
    .createHash("md5")
    .update("kkane@ncartmuseum.org")
    .digest("hex");

  const response = await mailchimp.lists.getListMember(
    "b554281be5", // NC Museum of Art Email List
    subscriber_hash
  );
  console.log(response);
}

async function submit(formJSON) {
  console.log("do something with");
  console.log(formJSON);
}

// ipc listeners -------------------------------------

ipcMain.handle("pingMailchimp", async (event) => {
  await ping();
});

ipcMain.handle("getListsMailchimp", async (event) => {
  await getLists();
});

ipcMain.handle("getMemberMailchimp", async (event) => {
  await getMember();
});

ipcMain.on("submitMailchimp", async (event, formJSON) => {
  await submit(formJSON);
});

// Next
// https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
