// DOM --------------------------------------------------------

const configForm = document.getElementById("config-form");
const formInputKioskWebURL = document.getElementById("form-input-kiosk-web-url");
const formInputTestConnection = document.getElementById("form-input-test-connection");
const resetFormDefaultsBtn = document.getElementById("reset-form-defaults-btn");

// Populate Form ----------------------------------------------

// Request the stored data from main.js containing either default or previous input
const appConfig = await window.electron.appConfig.request();
populateForm(appConfig);

function populateForm(config) {
  formInputKioskWebURL.value = config.kiosk_webpage_url;
  formInputTestConnection.checked = config.test_connection;
}

// Submit Form ------------------------------------------------

function submitForm(event) {
  event?.preventDefault();

  // Retrieve data from the form
  const data = new FormData(configForm);
  let userFormJSON = Object.fromEntries(data.entries());
  console.log(userFormJSON);

  let validFormJSON = validate(userFormJSON);

  console.log(validFormJSON);

  // Commit the form input data to local disk storage via main process
  if (validFormJSON) {
    window.electron.appConfig.update(validFormJSON);
  }
}

configForm.addEventListener("submit", submitForm);

// Validate Form ----------------------------------------------

function validate(userFormJSON) {
  let validFormJSON = {};

  // try, catch per input
  try {
    const formURL = new URL(userFormJSON?.kiosk_webpage_url);
    validFormJSON.kiosk_webpage_url = formURL.href;
    formInputKioskWebURL.style.color = "";
  } catch (error) {
    console.error(error);
    formInputKioskWebURL.style.color = "red";
    validFormJSON = null;
  }

  // no validation needed for checkbox, true/false only
  if (userFormJSON.test_connection) {
    validFormJSON.test_connection = true;
  } else {
    validFormJSON.test_connection = false;
  }

  return validFormJSON;
}

formInputKioskWebURL.addEventListener("input", () => {
  formInputKioskWebURL.style.color = "";
});

// Reset Form Defaults ----------------------------------------

async function resetFormDefaults() {
  const defaults = await window.electron.appConfig.getDefaults();
  populateForm(defaults);
  submitForm();
}

resetFormDefaultsBtn.addEventListener("click", resetFormDefaults);
