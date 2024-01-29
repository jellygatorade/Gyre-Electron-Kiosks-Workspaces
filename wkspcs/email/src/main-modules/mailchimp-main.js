const ipcMain = require("electron").ipcMain;
const fsPromises = require("node:fs/promises");
const path = require("node:path");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { customAlphabet } = require("nanoid");

const crypto = require("crypto");

// initialize ----------------------------------------

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.API_SERVER_NAME,
});

// implement mailchimp methods -----------------------

async function ping() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

async function getLists() {
  const response = await mailchimp.lists.getAllLists();
  console.log(response);
}

async function getMember(formJSON) {
  const member_email = formJSON.member_email;
  const subscriber_hash = getMD5string(member_email);

  const response = await mailchimp.lists.getListMember(
    "b554281be5", // NC Museum of Art Email List
    subscriber_hash
  );
  console.log(response);
}

async function addFile(formJSON) {
  console.log("do something with");

  const fileExt = path.extname(formJSON.file_path);
  const fileBase64 = await readFile(formJSON.file_path);

  const today = getFormattedDate();
  const uniqueID = nanoid();
  const filename = `WaC_test_${today}_${uniqueID}${fileExt}`;

  const response = await mailchimp.fileManager.upload({
    name: filename,
    file_data: fileBase64,
  });
  console.log(response);
}

async function submit(formJSON) {
  console.log("do something with");
  console.log(formJSON);
}

// helper functions ----------------------------------

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

const nanoid = customAlphabet("1234567890abcdef", 6);

// ipc listeners -------------------------------------

ipcMain.handle("pingMailchimp", async (event) => {
  await ping();
});

ipcMain.handle("getListsMailchimp", async (event) => {
  await getLists();
});

ipcMain.handle("getMemberMailchimp", async (event, formJSON) => {
  await getMember(formJSON);
});

ipcMain.handle("addFileMailchimp", async (event, formJSON) => {
  await addFile(formJSON);
});

ipcMain.handle("submitMailchimp", async (event, formJSON) => {
  await submit(formJSON);
});

// Next
// https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/

// upload the file
// add the member, with file identified in merge fields
// --> if member is already present, patch the member with updated file identity in merge fields
// remove tag from the member (ensures workflow trigger)
// add tag from the member
