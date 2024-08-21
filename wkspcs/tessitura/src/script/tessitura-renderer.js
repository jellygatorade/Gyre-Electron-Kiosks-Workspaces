// ipc listener ----------------------------------------

function onTessituraResponse(msg) {
  console.log(msg);
}

// event listeners -------------------------------------

function pingBtnOnClick() {
  window.electron.tessitura.ping();
}

function getConstituentsBtnOnClick(event) {
  event.preventDefault();
  const formJSON = getFormJson(event);
  formJSON.constituent_ids = formJSON.constituent_ids.replace(/\s+/g, ""); // remove all white space from string
  window.electron.tessitura.getConstituents(formJSON.constituent_ids);
}

function getElectronicAddressesBtnOnClick(event) {
  event.preventDefault();
  const formJSON = getFormJson(event);
  formJSON.constituent_ids = formJSON.constituent_ids.replace(/\s+/g, ""); // remove all white space from string
  window.electron.tessitura.getElectronicAddresses(formJSON.constituent_ids);
}

function getContactPermissionsBtnOnClick(event) {
  event.preventDefault();
  const formJSON = getFormJson(event);
  formJSON.constituent_ids = formJSON.constituent_ids.replace(/\s+/g, ""); // remove all white space from string
  window.electron.tessitura.getContactPermissions(formJSON.constituent_ids);
}

function searchConstituentsByEmailBtnOnClick(event) {
  event.preventDefault();
  const formJSON = getFormJson(event);
  formJSON.email = formJSON.email.replace(/\s+/g, ""); // remove all white space from string
  window.electron.tessitura.searchConstituentsByEmail(formJSON.email);
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

const tessituraRenderer = {
  init: function () {
    logElectronInterfaces();

    // get buttons ------------------------------------

    const pingBtn = document.getElementById("ping-btn");
    const getConstituentsBtn = document.getElementById("get-constituents-btn");
    const getElectronicAddressesBtn = document.getElementById("get-electronic-addresses-btn");
    const getContactPermissionsBtn = document.getElementById("get-contact-permissions-btn");
    const searchConstituentsByEmailBtn = document.getElementById("search-constituents-by-email-btn");

    // add listeners ----------------------------------

    pingBtn.addEventListener("click", pingBtnOnClick);
    getConstituentsBtn.addEventListener("click", getConstituentsBtnOnClick);
    getElectronicAddressesBtn.addEventListener("click", getElectronicAddressesBtnOnClick);
    getContactPermissionsBtn.addEventListener("click", getContactPermissionsBtnOnClick);
    searchConstituentsByEmailBtn.addEventListener("click", searchConstituentsByEmailBtnOnClick);

    // listeners for main process ---------------------

    if (window?.electron?.tessitura?.onResponse) {
      window.electron.tessitura.onResponse(onTessituraResponse);
    }
  },
};

export { tessituraRenderer };
