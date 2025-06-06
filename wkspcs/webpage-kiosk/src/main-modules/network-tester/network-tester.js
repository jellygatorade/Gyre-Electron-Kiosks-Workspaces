const isReachable = require("is-reachable");
const ipcMain = require("electron").ipcMain;

const Navigator = require("../navigator.js");
const { intervalTask, intervalTaskRunner } = require("./interval-task-runner.js");
const { configJSONStore } = require("../json-store/config-store.js");

// Inject Navigator method ------------------------------------

Navigator.toggleNetworkTester = toggleNetworkTester;

// Setup Task -------------------------------------------------

let attempts = 0;

async function testConnection() {
  let uris = configJSONStore.get("kiosk_webpage_urls");
  uris = uris.map((uri) => uri.trim().toLowerCase());

  attempts = attempts + 1; // increment counter
  let promises = [];

  uris.forEach((uri) => promises.push(isReachable(uri, { timeout: 5000 })));

  let results = await Promise.all(promises);
  console.log(`(testConnection, Attempt: ${attempts}, Results of isReachable are: ${results})`);

  const allTrue = (arr) => arr.every((item) => item === true);
  let connection = allTrue(results);

  if (connection) {
    // console.log(`Connection successful!`);
    Navigator.setState({ state: Navigator.states.live });
    attempts = 0; // reset counter
  } else if (attempts < 5) {
    // console.log(`Timed out, trying again in 5s`);
    setTimeout(testConnection, 5000); // try again in 5s
  } else {
    // console.log(`Connection unavailable.`);
    Navigator.setState({ state: Navigator.states.loading });
    attempts = 0; // reset counter
  }
}

let testConnectionTask;

function setConnectionTask() {
  testConnectionTask = new intervalTask(testConnection, 1000 * configJSONStore.get("test_connection_interval"));
}

setConnectionTask();

// Clear old and re-initiate intervalTask upon new app config
ipcMain.handle("reset-test-connection-task", (event) => {
  setConnectionTask();
});

// Network Tester ---------------------------------------------

class NetworkTester {
  static start() {
    let uris = configJSONStore.get("kiosk_webpage_urls");
    console.log(`(Starting network tests. Interval: ${testConnectionTask.intervalTime}ms, URIs: ${uris})`);
    intervalTaskRunner.start({ task: testConnectionTask, immediately: true });
  }

  static stop() {
    let uris = configJSONStore.get("kiosk_webpage_urls");
    console.log(`(Stopping network tests to ${uris})`);
    intervalTaskRunner.stop({ task: testConnectionTask });
  }
}

// Start or stop NetworkTester --------------------------------
// Runs after Navigator changes state -------------------------

function toggleNetworkTester() {
  let NetworkTester_isNeeded = false;

  switch (Navigator.state) {
    // only start NetworkTester in live state
    // if test_connection is configured and at least one URI is retrieved from a web server
    case Navigator.states.live:
      let URIs = configJSONStore.get("kiosk_webpage_urls");
      URIs = URIs.map((uri) => uri.trim().toLowerCase());

      const isWeb = (uri) => {
        return uri.startsWith("http://") || uri.startsWith("https://");
      };
      let isAnyURIWeb = false;

      for (let i = 0; i < URIs.length; i++) {
        if (isWeb(URIs[i])) {
          isAnyURIWeb = true;
          break;
        }
      }

      // console.log(`is any URI web? ${isAnyURIWeb}`);

      if (configJSONStore.get("test_connection") && isAnyURIWeb) {
        // console.log("startNetworkTester - live - NetworkTester_isNeeded");
        NetworkTester_isNeeded = true;
      }

      break;

    case Navigator.states.config:
      NetworkTester_isNeeded = false; // never start NetworkTester in config state
      // console.log("startNetworkTester - config");
      break;

    case Navigator.states.loading:
      NetworkTester_isNeeded = true; // always start NetworkTester in loading state
      // console.log("startNetworkTester - loading");
      break;

    default:
      console.log(`(Navigator.state not found in Navigator.states. Unable to start NetworkTester.)`);
      break;
  }

  if (NetworkTester_isNeeded) {
    NetworkTester.start();
  } else {
    NetworkTester.stop();
  }
}

module.exports = NetworkTester;
