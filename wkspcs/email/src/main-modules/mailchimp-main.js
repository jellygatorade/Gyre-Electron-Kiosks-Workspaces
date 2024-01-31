const ipcMain = require("electron").ipcMain;
const fsPromises = require("node:fs/promises");
const path = require("node:path");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { customAlphabet } = require("nanoid");
const crypto = require("crypto");

// Get reference to window
const win = require("./create-window.js").get();

// ---------------------------------------------------
// initialize ----------------------------------------
// ---------------------------------------------------

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.API_SERVER_NAME,
});

const mailchimp_ids = {
  kiosk_list_id: process.env.MAILCHIMP_KIOSK_LIST_ID,
  ncma_list_id: process.env.MAILCHIMP_NCMA_LIST_ID,
  folder_id: Number(process.env.MAILCHIMP_FOLDER_ID),
};

// ---------------------------------------------------
// implement mailchimp methods -----------------------
// ---------------------------------------------------

async function ping() {
  const response = await mailchimp.ping.get();

  win.webContents.send("mailchimpResponse", response);
}

async function getLists() {
  const response = await mailchimp.lists.getAllLists();

  win.webContents.send("mailchimpResponse", response);
}

async function getFileManagerFolders() {
  const response = await mailchimp.fileManager.listFolders();

  win.webContents.send("mailchimpResponse", response);
}

async function getMember(formJSON) {
  const member_email = formJSON.member_email;
  const subscriber_hash = getMD5string(member_email);

  const response = await mailchimp.lists.getListMember(
    mailchimp_ids.kiosk_list_id,
    subscriber_hash
  );

  win.webContents.send("mailchimpResponse", response);
}

async function addMember(formJSON) {
  const member_email = formJSON.member_email;

  // https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/

  const response = await mailchimp.lists.addListMember(
    mailchimp_ids.kiosk_list_id,
    {
      email_address: member_email,
      status: "subscribed", // "pending"
    }
  );

  win.webContents.send("mailchimpResponse", response);
}

async function updateMergeFields(formJSON) {
  const member_email = formJSON.member_email;
  const subscriber_hash = getMD5string(member_email);
  const image_url = formJSON.image_url;

  // use
  // https://mailchimp.com/developer/marketing/api/list-members/update-list-member/
  //
  // see - for decision to use imageurl
  // https://mailchimp.com/developer/marketing/docs/merge-fields/#structure

  const response = await mailchimp.lists.updateListMember(
    mailchimp_ids.kiosk_list_id,
    subscriber_hash,
    {
      merge_fields: {
        IMAGE: image_url,
      },
    }
  );

  win.webContents.send("mailchimpResponse", response);
}

async function addFile(formJSON) {
  const fileExt = path.extname(formJSON.file_path);
  const fileBase64 = await readFile(formJSON.file_path);

  const today = getFormattedDate();
  const uniqueID = nanoid();
  const filename = `WaC_test_${today}_${uniqueID}${fileExt}`;

  const response = await mailchimp.fileManager.upload({
    name: filename,
    file_data: fileBase64,
    folder_id: mailchimp_ids.folder_id,
  });

  win.webContents.send("mailchimpResponse", response);
}

async function submit(formJSON) {
  win.webContents.send("mailchimpResponse", "Main doing something with");
  win.webContents.send("mailchimpResponse", formJSON);
}

// ---------------------------------------------------
// helper functions ----------------------------------
// ---------------------------------------------------

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

const nanoid = customAlphabet("1234567890abcdef", 6); // returns a function that returns 6 char randomized alphanumeric string

// ---------------------------------------------------
// ipc listeners -------------------------------------
// ---------------------------------------------------

ipcMain.handle("pingMailchimp", async (event) => {
  await ping();
});

ipcMain.handle("getListsMailchimp", async (event) => {
  await getLists();
});

ipcMain.handle("getFileManagerFoldersMailchimp", async (event) => {
  await getFileManagerFolders();
});

ipcMain.handle("getMemberMailchimp", async (event, formJSON) => {
  await getMember(formJSON);
});

ipcMain.handle("addMemberMailchimp", async (event, formJSON) => {
  await addMember(formJSON);
});

ipcMain.handle("updateMergeFieldsMailchimp", async (event, formJSON) => {
  await updateMergeFields(formJSON);
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
