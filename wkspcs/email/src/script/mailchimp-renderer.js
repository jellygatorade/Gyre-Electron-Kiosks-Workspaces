// ipc listener ----------------------------------------

function onMailchimpResponse(msg) {
  console.log(msg);
}

// event listeners -------------------------------------

function pingBtnOnClick() {
  window.electron.email.ping();
}

function getListsBtnOnClick() {
  window.electron.email.getLists();
}

function getFileManagerFoldersOnClick() {
  window.electron.email.getFileManagerFolders();
}

function logActiveQueuesBtnOnClick() {
  window.electron.email.logActiveQueues();
}

function getMemberBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);

  // would validate form here

  const limitedFormJSON = {
    member_email: formJSON.member_email,
  };

  window.electron.email.getMember(limitedFormJSON);
}

function addMemberBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);

  // would validate form here

  const limitedFormJSON = {
    member_email: formJSON.member_email,
  };

  window.electron.email.addMember(limitedFormJSON);
}

function updateMergeFieldsBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);
  // would validate form here

  const limitedFormJSON = {
    member_email: formJSON.member_email,
    image_url_fullsize: formJSON.image_url_full,
    image_url_564width: formJSON.image_url_564width,
  };

  window.electron.email.updateMergeFields(limitedFormJSON);
}

function getMemberTagsBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);

  // would validate form here

  const limitedFormJSON = {
    member_email: formJSON.member_email,
  };

  window.electron.email.getMemberTags(limitedFormJSON);
}

function updateMemberTagsBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);

  // would validate form here

  const limitedFormJSON = {
    member_email: formJSON.member_email,
    tag_name: formJSON.tag_name,
    tag_status: formJSON.tag_status,
  };

  window.electron.email.updateMemberTags(limitedFormJSON);
}

function addFileBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);

  // would validate form here

  const modifiedFormJSON = {
    file_path: formJSON?.file?.path,
  };

  console.log(modifiedFormJSON);

  window.electron.email.addFile(modifiedFormJSON);
}

function triggerJourneyStepBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);

  // would validate form here

  const limitedFormJSON = {
    member_email: formJSON.member_email,
  };

  window.electron.email.triggerJourneyStep(limitedFormJSON);
}

function sendImageBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);
  // console.log(formJSON);

  // would validate form here

  const limitedFormJSON = {
    member_email: formJSON.member_email,
    file_path_fullsize: formJSON?.file_full?.path,
    file_path_564width: formJSON?.file_564w?.path,
  };

  // console.log(limitedFormJSON);

  window.electron.email.sendImage(limitedFormJSON);
}

// helper functions ----------------------------------

function logElectronInterfaces() {
  console.log("Available IPC API: ", window.electron);
}

function getFormJson(event) {
  const form = event.currentTarget.form;
  const submitter = event.currentTarget;
  const formData = new FormData(form, submitter);
  const formJSON = Object.fromEntries(formData.entries());

  return formJSON;
}

// module object -------------------------------------

const mailchimpRenderer = {
  init: function () {
    // get buttons ------------------------------------

    const pingBtn = document.getElementById("ping-btn");
    const getListsBtn = document.getElementById("get-lists-btn");
    const getFileManagerFoldersBtn = document.getElementById(
      "get-file-manager-folders-btn"
    );
    const logActiveQueuesBtn = document.getElementById("log-active-queues-btn");
    const getMemberBtn = document.getElementById("get-member-btn");
    const addMemberBtn = document.getElementById("add-member-btn");
    const updateMergeFieldsBtn = document.getElementById(
      "update-merge-fields-btn"
    );
    const getMemberTagsBtn = document.getElementById("get-member-tags-btn");
    const updateMemberTagsBtn = document.getElementById(
      "update-member-tags-btn"
    );
    const addFileBtn = document.getElementById("add-file-btn");
    const triggerJourneyStepBtn = document.getElementById(
      "trigger-journey-step-btn"
    );
    const sendImageBtn = document.getElementById("send-image-btn");

    // add listeners ----------------------------------

    pingBtn.addEventListener("click", pingBtnOnClick);
    getListsBtn.addEventListener("click", getListsBtnOnClick);
    getFileManagerFoldersBtn.addEventListener(
      "click",
      getFileManagerFoldersOnClick
    );
    logActiveQueuesBtn.addEventListener("click", logActiveQueuesBtnOnClick);
    getMemberBtn.addEventListener("click", getMemberBtnOnClick);
    addMemberBtn.addEventListener("click", addMemberBtnOnClick);
    updateMergeFieldsBtn.addEventListener("click", updateMergeFieldsBtnOnClick);
    getMemberTagsBtn.addEventListener("click", getMemberTagsBtnOnClick);
    updateMemberTagsBtn.addEventListener("click", updateMemberTagsBtnOnClick);
    addFileBtn.addEventListener("click", addFileBtnOnClick);
    triggerJourneyStepBtn.addEventListener(
      "click",
      triggerJourneyStepBtnOnClick
    );
    sendImageBtn.addEventListener("click", sendImageBtnOnClick);

    logElectronInterfaces();

    // listeners for main process ---------------------

    if (window?.electron?.email?.onMailchimpResponse) {
      window.electron.email.onMailchimpResponse(onMailchimpResponse);
    }
  },
};

export { mailchimpRenderer };
