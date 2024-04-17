import * as domVars from "./global-vars-dom.js";

// Start in english by default
let lang = { langState: "en", langSwitch: "es" };

// Define a function that will control the language state variables
function setLanguage(choice) {
  if (choice === "en") {
    lang.langState = "en";
    localStorage.setItem("langState", lang.langState);
    lang.langSwitch = "es";
    return;
  }
  if (choice === "es") {
    lang.langState = "es";
    localStorage.setItem("langState", lang.langState);
    lang.langSwitch = "en";
    return;
  }
}

// Create the language controls on the language toggle button
domVars.toggleLangButton.addEventListener("click", function () {
  applyLanguage(lang.langSwitch);
  //console.log(`Language is now ${lang.langState}`);
});

function applyLanguage(choice) {
  setLanguage(choice);
  window.electronAPI.sendAppliedLang(lang.langState); // send lang to video renderer via main renderer

  // Maybe it's not ideal to query for these every time the button is pressed
  // But if there are any removed or added to the DOM dynamically
  // They have to be included in their respective "en" or "es" NodeList at some point for this function to apply to them
  let enNodeList = document.querySelectorAll('[lang="en"]');
  let esNodeList = document.querySelectorAll('[lang="es"]');

  if (choice === "en") {
    domVars.toggleLangButton.innerText = "Español";
    enNodeList.forEach(function (node) {
      // Fall back on default stylesheet for display
      // This handles the differences between elements that should be "block" and those that should be "inline"
      node.style.display = null;
    });
    esNodeList.forEach(function (node) {
      node.style.display = "none";
    });
  } else if (choice === "es") {
    domVars.toggleLangButton.innerText = "English";
    esNodeList.forEach(function (node) {
      // Fall back on default stylesheet for display
      // This handles the differences between elements that should be "block" and those that should be "inline"
      node.style.display = null;
    });
    enNodeList.forEach(function (node) {
      node.style.display = "none";
    });
  }
}

export { applyLanguage, setLanguage, lang };
