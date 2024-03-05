import { dom } from "./dom.js";

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

function applyLanguage(choice) {
  setLanguage(choice);

  // Maybe it's not ideal to query for these every time the button is pressed
  // But if there are any removed or added to the DOM dynamically
  // They have to be included in their respective "en" or "es" NodeList at some point for this function to apply to them
  let enNodeList = document.querySelectorAll('[lang="en"]');
  let esNodeList = document.querySelectorAll('[lang="es"]');

  if (choice === "en") {
    enNodeList.forEach(function (node) {
      // Fall back on default stylesheet for display
      // This handles the differences between elements that should be "block" and those that should be "inline"
      node.style.display = null;
    });
    esNodeList.forEach(function (node) {
      node.style.display = "none";
    });
  } else if (choice === "es") {
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

const langToggle = {
  init: function () {
    // Sets up language toggle buttons in the UI
    this.buttons.forEach((button) => {
      button.addEventListener("click", function () {
        applyLanguage(lang.langSwitch);
      });
    });
  },

  buttons: [
    dom.mainMenuToggleLangBtn,
    dom.watchMenuToggleLangButton,
    dom.readViewToggleLangButton,
  ],
};

export { applyLanguage, setLanguage, lang, langToggle };
