const ipcMain = require("electron").ipcMain;
const fsPromises = require("node:fs/promises");
const path = require("node:path");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { customAlphabet } = require("nanoid");
const crypto = require("crypto");

// Get reference to window
const win = require("./create-window.js").get();

const timedQueues = require("./timed-delay-queue.js");

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

function test1(formJSON) {
  console.log("(timed delay func)");
  console.log(formJSON);
}
// function test2(str1, str2) {
//   console.log(str1, str2);
// }

// timedQueues.createInstance("module");
// timedQueues.getInstance("module").add(test1, 1000, ["one", "two"]);
// timedQueues.getInstance("module").add(test1, 1000, ["one", "two"]);
// timedQueues.getInstance("module").add(test1, 3000);
// timedQueues.getInstance("module").add(test2, 500, ["something"]);

// timedQueues.getInstance("module").start();

// setTimeout(timedQueues.destroyInstance, 5000, "module");

// ---------------------------------------------------
// implement mailchimp methods -----------------------
// ---------------------------------------------------

async function ping() {
  let response = {};
  try {
    response = await mailchimp.ping.get();
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function getLists() {
  let response = {};
  try {
    response = await mailchimp.lists.getAllLists();
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function getFileManagerFolders() {
  let response = {};
  try {
    response = await mailchimp.fileManager.listFolders();
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function getMember(formJSON) {
  const member_email = formJSON.member_email;
  const subscriber_hash = getMD5string(member_email);

  let response = {};
  try {
    response = await mailchimp.lists.getListMember(
      mailchimp_ids.kiosk_list_id,
      subscriber_hash
    );
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function addMember(formJSON) {
  const member_email = formJSON.member_email;

  // https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/

  let response = {};
  try {
    response = await mailchimp.lists.addListMember(
      mailchimp_ids.kiosk_list_id,
      {
        email_address: member_email,
        status: "subscribed", // "pending"
      }
    );
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
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

  // const response = await mailchimp.lists.updateListMember(
  //   mailchimp_ids.kiosk_list_id,
  //   subscriber_hash,
  //   {
  //     merge_fields: {
  //       IMAGE: image_url,
  //     },
  //   }
  // );

  // win.webContents.send("mailchimpResponse", response);

  let response = {};
  try {
    response = await mailchimp.lists.updateListMember(
      mailchimp_ids.kiosk_list_id,
      subscriber_hash,
      {
        merge_fields: {
          IMAGE: image_url,
        },
      }
    );
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function getMemberTags(formJSON) {
  const member_email = formJSON.member_email;
  const subscriber_hash = getMD5string(member_email);

  let response = {};
  try {
    response = await mailchimp.lists.getListMemberTags(
      mailchimp_ids.kiosk_list_id,
      subscriber_hash
    );
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function updateMemberTags(formJSON) {
  const member_email = formJSON.member_email;
  const subscriber_hash = getMD5string(member_email);
  const tag_name = formJSON.tag_name;
  const tag_status = formJSON.tag_status;

  // only allow changes to DispatchEmail tag
  // trying to keep Mailchimp tags clean
  if (tag_name !== "DispatchEmail") {
    win.webContents.send(
      "mailchimpResponse",
      "Only updates to 'DispatchEmail' tag are currently allowed."
    );
    return;
  }

  let response = {};
  try {
    response = await mailchimp.lists.updateListMemberTags(
      mailchimp_ids.kiosk_list_id,
      subscriber_hash,
      { tags: [{ name: tag_name, status: tag_status }] }
    );
    // success response is for updateListMemberTags() is null (http status 204)
    // https://mailchimp.com/developer/marketing/api/list-member-tags/list-member-tags/
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
    if (!response) {
      response = {};
    }
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function addFile(formJSON) {
  const fileExt = path.extname(formJSON.file_path);
  const fileBase64 = await readFile(formJSON.file_path);

  const today = getFormattedDate();
  const uniqueID = nanoid();
  const filename = `WaC_test_${today}_${uniqueID}${fileExt}`;

  let response = {};
  try {
    response = await mailchimp.fileManager.upload({
      name: filename,
      file_data: fileBase64,
      folder_id: mailchimp_ids.folder_id,
    });
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function triggerJourneyStep(formJSON) {
  const member_email = formJSON.member_email;
  const journey_id = 2;
  const step_id = 78;

  let response = {};
  try {
    response = await mailchimp.customerJourneys.trigger(journey_id, step_id, {
      email_address: member_email,
    });
    // success response is for customerJourneys.trigger() is null (http status 204)
    // https://mailchimp.com/developer/marketing/api/customer-journeys-journeys-steps-actions/customer-journeys-api-trigger-for-a-contact/
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
    if (!response) {
      response = {};
    }
  } catch (error) {
    response._status = error.status;
    handleError(error);
    return response;
  }

  response._status = 200;
  win.webContents.send("mailchimpResponse", response);
  return response;
}

async function v2_submit(formJSON) {
  // Using triggerJourneyStep instead of tag
  // and using queues
  //
  // error handling - ERROR UI
  //                - log error to file
  //                - publish error to some log UI, viewable on key toggle
  //
  // 1 - query for the member
  //     if member found - goto 3
  //     if member is not found - goto 2
  //     catch other error - error UI
  //
  // 2 - add the member
  //     on success - goto 4
  //     on fail - error UI
  //
  // 3 - check member last_updated
  //     if last_updated <= 15 minutes ago - CREATE queue for that address or ADD to queue for that address
  //     if last_updated > 15 minutes ago - goto 4
  //
  // 4 - upload the file - (split into separate process)

  let response;

  await m_launchProcess();
  console.log("(process complete)");
  return;

  async function m_launchProcess() {
    await m_getMember();
  }

  async function m_getMember() {
    console.log("(getting member)");
    response = await getMember(formJSON);

    switch (response._status) {
      case 404:
        console.log("(member not found)");
        console.log("(INCOMPLETE EXITING)");
        // await m_addMember();
        break;
      case 200:
        console.log("(member found)");
        await m_checkLastUpdated(response.last_changed);
        break;
      default:
        console.log(`Some other error was encountered: ${response._status}`);
    }
  }

  // TO DO
  // ADD MEMBER

  // MONITOR ACTIVE TIMEDQUEUES
  // DESTROY TIMEDQUEUES THAT ARE MARKED DONE ... in timedQueue._next() ?

  // async function m_addMember() {
  //   console.log("(adding member)");
  //   response = await addMember(formJSON);

  //   switch (response._status) {
  //     case 200:
  //       console.log("(member added)");
  //       await v2_upload();
  //       break;
  //     default:
  //       console.log(`An error was encountered: ${response._status}`);
  //   }
  // }

  async function m_checkLastUpdated(last_changed) {
    const tooSoonForMailchimp = isWithinLastMinutes(last_changed, 15);
    if (tooSoonForMailchimp) {
      // too soon!
      // CREATE queue for that address or ADD to queue for that address
      createUpdateSubmissionQueue(formJSON);
    } else {
      // send it!
      await v2_upload(formJSON);
    }
  }

  function createUpdateSubmissionQueue(formJSON) {
    const instance_id = formJSON.member_email;
    const instance = timedQueues.getInstance(instance_id);
    const delay_time = 1000 * 60 * 20; // 20 minutes

    if (!instance) {
      console.log(`(Creating timed queue for - ${instance_id})`);
      timedQueues.createInstance(instance_id);
      timedQueues
        .getInstance(instance_id)
        .add(v2_upload, delay_time, [formJSON]);
      timedQueues.getInstance(instance_id).start();
    } else {
      console.log(`(Found queue for - ${instance_id})`);
      timedQueues
        .getInstance(instance_id)
        .add(v2_upload, delay_time, [formJSON]);
      if (timedQueues.getInstance(instance_id).done) {
        timedQueues.getInstance(instance_id).start();
      }
    }
  }
}

async function v2_upload(formJSON) {
  // 4 - upload the file
  //     on success - store image URL, goto 5
  //     on fail - error UI (log to file? or some log UI that is viewable with key toggle?)
  //
  // 5 - update merge field on the member with image url
  //     on success - goto 6
  //     on fail - error UI
  //
  // 6 - trigger journey step on the member
  //     on success - COMPLETE -> email scheduled UI!
  //     on fail - error UI

  let response;

  await m_launchProcess();
  console.log("(mailchimp submission complete)");
  return;

  async function m_launchProcess() {
    await m_addFile();
  }

  async function m_addFile() {
    console.log("(uploading file)");
    response = await addFile(formJSON);

    switch (response._status) {
      case 200:
        console.log("(file uploaded)");
        formJSON.image_url = response.full_size_url; // store the image url
        await m_updateMergeFields(); // add image url to contact merge fields
        break;
      default:
        console.log(`An error was encountered: ${response._status}`);
    }
  }

  async function m_updateMergeFields() {
    console.log("(updating merge fields)");
    response = await updateMergeFields(formJSON);

    switch (response._status) {
      case 200:
        console.log("(merge fields updated)");
        await m_triggerJourneyStep(formJSON);
        break;
      default:
        console.log(`An error was encountered: ${response._status}`);
    }
  }

  async function m_triggerJourneyStep(formJSON) {
    console.log("(triggering journey step)");

    response = await triggerJourneyStep(formJSON);

    switch (response._status) {
      case 200:
        console.log("(journey step triggered)");
        // Complete!
        break;
      default:
        console.log(`An error was encountered: ${response._status}`);
    }
  }
}

async function submit(formJSON) {
  // 1 - query for the member
  //     if member found - goto 3
  //     if member is not found - goto 2
  //     catch other error - error UI
  //
  // 2 - add the member
  //     on success - goto 3
  //     on fail - error UI
  //
  // 3 - check member tags
  //     !DispatchEmail tag - goto 4
  //     has DispatchEmail tag - error UI? please wait x minutes?, or add to end of queue?
  //
  // 4 - upload the file
  //     on success - store image URL, goto 5
  //     on fail - error UI (log to file? or some log UI that is viewable with key toggle?)
  //
  // 5 - update merge field on the member with image url
  //     on success - goto 6
  //     on fail - error UI
  //
  // 6 - add tag to the member
  //     on success - COMPLETE -> email scheduled UI!
  //     on fail - error UI
  //
  // add the member, with file url in merge field IMAGE
  // --> if member is already present, patch the member with updated file identity in merge fields
  // remove tag from the member (ensures workflow trigger)
  // add tag from the member

  //
  //
  // 6alt - trigger endpoint journey

  // win.webContents.send("mailchimpResponse", "Main doing something with");
  // win.webContents.send("mailchimpResponse", formJSON);

  let response;

  await m_launchProcess();
  console.log("(process complete)");
  return;

  async function m_launchProcess() {
    await m_getMember();
  }

  async function m_getMember() {
    console.log("(getting member)");
    response = await getMember(formJSON);

    switch (response._status) {
      case 404:
        console.log("(member not found)");
        await m_addMember();
        break;
      case 200:
        console.log("(member found)");
        // await m_addFile();
        await m_getMemberTags();
        break;
      default:
        console.log(`Some other error was encountered: ${response._status}`);
    }
  }

  async function m_addMember() {
    console.log("(adding member)");
    response = await addMember(formJSON);

    switch (response._status) {
      case 200:
        console.log("(member added)");
        await m_addFile();
        break;
      default:
        console.log(`An error was encountered: ${response._status}`);
    }
  }

  async function m_getMemberTags() {
    console.log("(checking member tags)");
    response = await getMemberTags(formJSON);

    switch (response._status) {
      case 200:
        console.log("(member tags retrieved)");
        let hasDispatchTag = response.tags.find(
          (obj) => obj.name === "DispatchEmail"
        );
        hasDispatchTag
          ? onDispatchTagFound() // notice to wait, or add submission to queue
          : await onDispatchTagNotFound(); // proceed submission, upload file
        break;
      default:
        console.log(`An error was encountered: ${response._status}`);
    }

    async function onDispatchTagNotFound() {
      console.log("(contact is untagged)");
      await m_addFile();
    }

    function onDispatchTagFound() {
      console.log("(contact is tagged)");
    }
  }

  async function m_addFile() {
    console.log("(uploading file)");
    response = await addFile(formJSON);

    switch (response._status) {
      case 200:
        console.log("(file uploaded)");
        formJSON.image_url = response.full_size_url; // store the image url
        await m_updateMergeFields(); // add image url to contact merge fields
        break;
      default:
        console.log(`An error was encountered: ${response._status}`);
    }
  }

  async function m_updateMergeFields() {
    console.log("(updating merge fields)");
    response = await updateMergeFields(formJSON);

    switch (response._status) {
      case 200:
        console.log("(merge fields updated)");
        await m_updateMemberTags();
        break;
      default:
        console.log(`An error was encountered: ${response._status}`);
    }
  }

  async function m_updateMemberTags() {
    console.log("(updating member tags)");

    formJSON.tag_name = "DispatchEmail";
    formJSON.tag_status = "active";

    response = await updateMemberTags(formJSON);

    switch (response._status) {
      case 200:
        console.log("(member tags updated)");
        // Complete!
        break;
      default:
        console.log(`An error was encountered: ${response._status}`);
    }
  }
}

// ---------------------------------------------------
// helper functions ----------------------------------
// ---------------------------------------------------

function handleError(error) {
  // Do something with mailchimp errors
  // Dump to logfile?
  win.webContents.send("mailchimpResponse", `Mailchimp error: ${error.status}`);
  win.webContents.send("mailchimpResponse", error.response.body);
  // console.error(error);
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

ipcMain.handle("getMemberTagsMailchimp", async (event, formJSON) => {
  await getMemberTags(formJSON);
});

ipcMain.handle("triggerJourneyStepMailchimp", async (event, formJSON) => {
  await triggerJourneyStep(formJSON);
});

ipcMain.handle("updateMemberTagsMailchimp", async (event, formJSON) => {
  await updateMemberTags(formJSON);
});

ipcMain.handle("updateMergeFieldsMailchimp", async (event, formJSON) => {
  await updateMergeFields(formJSON);
});

ipcMain.handle("addFileMailchimp", async (event, formJSON) => {
  await addFile(formJSON);
});

ipcMain.handle("submitMailchimp", async (event, formJSON) => {
  await v2_submit(formJSON);
});
