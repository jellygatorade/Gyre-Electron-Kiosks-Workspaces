// DOM --------------------------------------------------------

const configForm = document.getElementById("config-form");
const formInputQuantityDisplays = document.getElementById("form-input-quantity-displays");
const formInputKioskWebURL = document.getElementById("form-input-kiosk-web-url");
const formInputBrowserZoomFactor = document.getElementById("form-input-browser-zoom-factor");
const formInputTestConnection = document.getElementById("form-input-test-connection");
const formInputTestConnectionInterval = document.getElementById("form-input-test-connection-interval");
const formListItemTestConnectionInterval = document.getElementById("form-list-item-test-connection-interval");
const resetFormDefaultsBtn = document.getElementById("reset-form-defaults-btn");

// Populate Form ----------------------------------------------

// Request the stored data from main.js containing either default or previous input
const appConfig = await window.electron.appConfig.request();
populateForm(appConfig);

function populateForm(config) {
  console.log(config);
  formInputQuantityDisplays.value = config.quantity_displays;
  formInputKioskWebURL.value = config.kiosk_webpage_url;
  formInputBrowserZoomFactor.value = config.browser_zoom_factor;
  formInputTestConnection.checked = config.test_connection;
  formInputTestConnectionInterval.value = config.test_connection_interval;
}

// Listen for config updates made in main process -------------

window.electron.appConfig.onNewZoomFactor(onNewZoomFactor);

function onNewZoomFactor(zoom_factor) {
  formInputBrowserZoomFactor.value = zoom_factor;
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

  // validate per input

  if (isNumeric(userFormJSON?.quantity_displays) && parseInt(userFormJSON?.quantity_displays)) {
    validFormJSON.quantity_displays = parseInt(userFormJSON?.quantity_displays);
    formInputQuantityDisplays.style.color = "";
  } else {
    formInputQuantityDisplays.style.color = "red";
    return null;
  }

  try {
    const formURL = new URL(userFormJSON?.kiosk_webpage_url);
    validFormJSON.kiosk_webpage_url = formURL.href;
    formInputKioskWebURL.style.color = "";
  } catch (error) {
    console.error(error);
    formInputKioskWebURL.style.color = "red";
    return null;
  }

  if (isNumeric(userFormJSON?.browser_zoom_factor) && parseFloat(userFormJSON?.browser_zoom_factor)) {
    validFormJSON.browser_zoom_factor = parseFloat(userFormJSON?.browser_zoom_factor);
    formInputBrowserZoomFactor.style.color = "";
  } else {
    formInputBrowserZoomFactor.style.color = "red";
    return null;
  }

  // no validation needed for checkbox, true/false only
  if (userFormJSON?.test_connection) {
    validFormJSON.test_connection = true;
  } else {
    validFormJSON.test_connection = false;
  }

  if (isNumeric(userFormJSON?.test_connection_interval) && parseInt(userFormJSON?.test_connection_interval)) {
    validFormJSON.test_connection_interval = parseInt(userFormJSON?.test_connection_interval);
    formInputTestConnectionInterval.style.color = "";
  } else {
    formInputTestConnectionInterval.style.color = "red";
    return null;
  }

  function isNumeric(num) {
    return !isNaN(num);
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
  onChange_formInputTestConnection();
  submitForm();
}

resetFormDefaultsBtn.addEventListener("click", resetFormDefaults);

// KioskWebURL + browser-zoom-factor input conditionally --------------------------------

// ...

// Show frequency input conditionally -------------------------

addEventListener("change", onChange_formInputTestConnection);

function onChange_formInputTestConnection() {
  console.log("change");
  if (formInputTestConnection.checked) {
    formListItemTestConnectionInterval.style.display = "block";
  } else {
    formListItemTestConnectionInterval.style.display = "none";

    // reset to default value if no value
    if (!formInputTestConnectionInterval.value) {
      formInputTestConnectionInterval.value = appConfig.test_connection_interval;
    }
  }
}

onChange_formInputTestConnection(); // initial
