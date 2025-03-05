// DOM --------------------------------------------------------

const configForm = document.getElementById("config-form");

const displayInputsContainer = document.getElementById("display-inputs-container");
const optionsDISPLAYX = document.getElementById("options-DISPLAYX");
const display_options_x = optionsDISPLAYX.cloneNode(true);

const formInputQuantityDisplays = document.getElementById("form-input-quantity-displays");
const formInputKioskWebURL = document.getElementById("form-input-kiosk-web-url");
const formInputBrowserZoomFactor = document.getElementById("form-input-browser-zoom-factor");
const formInputTestConnection = document.getElementById("form-input-test-connection");
const formInputTestConnectionInterval = document.getElementById("form-input-test-connection-interval");
const formListItemTestConnectionInterval = document.getElementById("form-list-item-test-connection-interval");
const resetFormDefaultsBtn = document.getElementById("reset-form-defaults-btn");

// Initialize Form --------------------------------------------

// Request the stored data from main.js containing either default or previous input
const appConfig = await window.electron.appConfig.request();
populateForm(appConfig);

onChange_formInputQuantityDisplays();
onChange_formInputTestConnection();

// Populate Form ----------------------------------------------

function populateForm(config) {
  console.log(config);
  formInputQuantityDisplays.value = config.quantity_displays;
  // formInputKioskWebURL.value = config.kiosk_webpage_url;
  // formInputBrowserZoomFactor.value = config.browser_zoom_factor;
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
  const userFormJSON = getFormJSON();
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

  validFormJSON.kiosk_webpage_urls = [];
  const url_key_template = "kiosk_webpage_url_DISPLAY\\d+";
  const matching_url_keys = getKeysByTemplate(userFormJSON, url_key_template);
  for (let i = 0; i < matching_url_keys.length; i++) {
    try {
      const formURL = new URL(userFormJSON?.[matching_url_keys[i]]);
      validFormJSON.kiosk_webpage_urls.push(formURL.href);
      // formInputKioskWebURL.style.color = "";
    } catch (error) {
      console.error(error);
      // formInputKioskWebURL.style.color = "red";
      return null;
    }
  }

  validFormJSON.browser_zoom_factors = [];
  const zoom_key_template = "browser_zoom_factor_DISPLAY\\d+";
  const matching_zoom_keys = getKeysByTemplate(userFormJSON, zoom_key_template);
  for (let i = 0; i < matching_zoom_keys.length; i++) {
    if (isNumeric(userFormJSON?.[matching_zoom_keys[i]]) && parseFloat(userFormJSON?.[matching_zoom_keys[i]])) {
      validFormJSON.browser_zoom_factors.push(parseFloat(userFormJSON?.[matching_zoom_keys[i]]));
      // formInputBrowserZoomFactor.style.color = "";
    } else {
      // formInputBrowserZoomFactor.style.color = "red";
      return null;
    }
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

// Reset Form Defaults ----------------------------------------

async function resetFormDefaults() {
  const defaults = await window.electron.appConfig.getDefaults();
  populateForm(defaults);
  onChange_formInputTestConnection();
  submitForm();
}

resetFormDefaultsBtn.addEventListener("click", resetFormDefaults);

// KioskWebURL + browser-zoom-factor input conditionally --------------------------------

formInputQuantityDisplays.addEventListener("change", onChange_formInputQuantityDisplays);

function onChange_formInputQuantityDisplays() {
  removeAllChildNodes(displayInputsContainer);

  const userFormJSON = getFormJSON();
  const display_inputs_needed = parseInt(userFormJSON.quantity_displays);

  for (let i = 0; i < display_inputs_needed; i++) {
    displayInputsContainer.appendChild(createDisplayInputFields(i));
    // add existing values from appConfig here
  }
}

function createDisplayInputFields(iteration) {
  const new_display_options = display_options_x.cloneNode(true);

  const url_label = new_display_options.querySelector("label[for='form-input-kiosk-web-url-DISPLAYX']");
  const url_input = new_display_options.querySelector("input[id='form-input-kiosk-web-url-DISPLAYX']");
  const zoom_label = new_display_options.querySelector("label[for='form-input-browser-zoom-factor-DISPLAYX']");
  const zoom_input = new_display_options.querySelector("input[id='form-input-browser-zoom-factor-DISPLAYX']");

  url_input.addEventListener("input", () => {
    url_input.style.color = "";
  });

  replaceStringInAttributes(new_display_options, `DISPLAYX`, `DISPLAY${iteration}`);
  replaceStringInAttributes(url_label, `DISPLAYX`, `DISPLAY${iteration}`);
  replaceStringInAttributes(url_input, `DISPLAYX`, `DISPLAY${iteration}`);
  replaceStringInAttributes(zoom_label, `DISPLAYX`, `DISPLAY${iteration}`);
  replaceStringInAttributes(zoom_input, `DISPLAYX`, `DISPLAY${iteration}`);

  return new_display_options;
}

// Show frequency input conditionally -------------------------

formInputTestConnection.addEventListener("change", onChange_formInputTestConnection);

function onChange_formInputTestConnection() {
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

// Utilities --------------------------------------------------

function getFormJSON() {
  const data = new FormData(configForm);
  return Object.fromEntries(data.entries());
}

function replaceStringInAttributes(node, stringToReplace, replacementString) {
  const attributes = node.attributes;

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    if (attribute.value.includes(stringToReplace)) {
      attribute.value = attribute.value.replaceAll(stringToReplace, replacementString);
      node.setAttribute(attribute.name, attribute.value);
    }
  }
}

function getKeysByTemplate(obj, template) {
  const regex = new RegExp(template);
  return Object.keys(obj).filter((key) => regex.test(key));
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
