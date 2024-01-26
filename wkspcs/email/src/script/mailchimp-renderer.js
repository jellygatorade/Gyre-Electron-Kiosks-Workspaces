function logElectronInterfaces() {
  console.log(window.electron);
}

// event listeners -------------------------------------

function pingBtnOnClick() {
  window.electron.email.ping();
}

function getListsBtnOnClick() {
  window.electron.email.getLists();
}

function submitEmailBtnOnClick(event) {
  event.preventDefault();

  const form = event.currentTarget.parentElement;
  const submitter = event.currentTarget;
  const formData = new FormData(form, submitter);
  const formJSON = Object.fromEntries(formData.entries());

  // would validate form here

  // remove file so don't have to deal with passing through electron right now
  const limitedFormJSON = {
    user_email: formJSON.user_email,
    user_name: formJSON.user_name,
  };

  window.electron.email.submit(limitedFormJSON);
}

// module object -------------------------------------

const mailchimpRenderer = {
  init: function () {
    const pingBtn = document.getElementById("ping-btn");
    const getListsBtn = document.getElementById("get-lists-btn");
    const submitEmailBtn = document.getElementById("submit-email-btn");
    const submitEmailForm = document.getElementById("submit-email-form");

    pingBtn.addEventListener("click", pingBtnOnClick);
    getListsBtn.addEventListener("click", getListsBtnOnClick);
    submitEmailBtn.addEventListener(
      "click",
      submitEmailBtnOnClick,
      submitEmailForm
    );

    logElectronInterfaces();
  },
};

export { mailchimpRenderer };
