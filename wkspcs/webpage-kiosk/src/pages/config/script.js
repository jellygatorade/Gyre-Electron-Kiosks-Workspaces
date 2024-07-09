const configForm = document.getElementById("config-form");
const formInputKioskWebURL = document.getElementById("form-input-kiosk-web-url");
const resetFormDefaultsBtn = document.getElementById("reset-form-defaults-btn");

// Populate Form ----------------------------------------------

// Request the stored data from main.js containing either default or previous input
const appConfig = await window.electron.appConfig.request();
populateForm(appConfig);

function populateForm(config) {
  formInputKioskWebURL.value = config.kiosk_webpage_url;
}

// Submit Form ------------------------------------------------

// Handles processing and storage of form data
function submitForm(event) {
  event?.preventDefault();

  // Retrieve data from the form
  const data = new FormData(configForm);
  let formJSON = Object.fromEntries(data.entries());
  console.log(formJSON);

  // Process the from data here if need

  // Populate results in DOM
  // domVars.configFormResults.innerText = JSON.stringify(formJSON, null, 2);

  // Commit the form input data to local disk storage via main process
  window.electron.appConfig.update(formJSON);

  // Process below is moved entirely to preload.js
  // IPC channel "labelConfigUpdated" receives a reply back from the Main process has handled the call to "updateLabelConfigStoreData"
  // This ensures recurringFetch is initated after labelConfig gets updated
}

configForm.addEventListener("submit", submitForm);

// Reset Form Defaults ----------------------------------------

async function resetFormDefaults() {
  const defaults = await window.electron.appConfig.getDefaults();
  populateForm(defaults);
  submitForm();
}

resetFormDefaultsBtn.addEventListener("click", resetFormDefaults);
