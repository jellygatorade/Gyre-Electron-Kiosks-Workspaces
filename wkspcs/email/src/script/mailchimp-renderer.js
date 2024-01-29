// event listeners -------------------------------------

function pingBtnOnClick() {
  window.electron.email.ping();
}

function getListsBtnOnClick() {
  window.electron.email.getLists();
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

function submitEmailBtnOnClick(event) {
  event.preventDefault();

  const formJSON = getFormJson(event);

  // would validate form here

  // remove file so don't have to deal with passing through electron right now
  const limitedFormJSON = {
    user_email: formJSON.user_email,
    user_name: formJSON.user_name,
  };

  window.electron.email.submit(limitedFormJSON);
}

// helper functions ----------------------------------

function logElectronInterfaces() {
  console.log(window.electron);
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
    const getMemberBtn = document.getElementById("get-member-btn");
    const submitEmailBtn = document.getElementById("submit-email-btn");

    pingBtn.addEventListener("click", pingBtnOnClick);
    getListsBtn.addEventListener("click", getListsBtnOnClick);
    getMemberBtn.addEventListener("click", getMemberBtnOnClick);
    submitEmailBtn.addEventListener("click", submitEmailBtnOnClick);

    logElectronInterfaces();
  },
};

export { mailchimpRenderer };
