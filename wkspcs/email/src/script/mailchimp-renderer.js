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
    image_url: formJSON.image_url,
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

function submitEmailBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);
  console.log(formJSON);

  // would validate form here

  const limitedFormJSON = {
    member_email: formJSON.member_email,
    member_fname: formJSON.member_fname,
    file_path: formJSON?.file?.path,
  };

  window.electron.email.submit(limitedFormJSON);
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
    const pingBtn = document.getElementById("ping-btn");
    const getListsBtn = document.getElementById("get-lists-btn");
    const getFileManagerFoldersBtn = document.getElementById(
      "get-file-manager-folders-btn"
    );
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
    const submitEmailBtn = document.getElementById("submit-email-btn");

    pingBtn.addEventListener("click", pingBtnOnClick);
    getListsBtn.addEventListener("click", getListsBtnOnClick);
    getFileManagerFoldersBtn.addEventListener(
      "click",
      getFileManagerFoldersOnClick
    );
    getMemberBtn.addEventListener("click", getMemberBtnOnClick);
    addMemberBtn.addEventListener("click", addMemberBtnOnClick);
    updateMergeFieldsBtn.addEventListener("click", updateMergeFieldsBtnOnClick);
    getMemberTagsBtn.addEventListener("click", getMemberTagsBtnOnClick);
    updateMemberTagsBtn.addEventListener("click", updateMemberTagsBtnOnClick);
    addFileBtn.addEventListener("click", addFileBtnOnClick);
    submitEmailBtn.addEventListener("click", submitEmailBtnOnClick);

    logElectronInterfaces();

    // listeners for main process ---------------------

    if (window?.electron?.email?.onMailchimpResponse) {
      window.electron.email.onMailchimpResponse(onMailchimpResponse);
    }
  },
};

export { mailchimpRenderer };
