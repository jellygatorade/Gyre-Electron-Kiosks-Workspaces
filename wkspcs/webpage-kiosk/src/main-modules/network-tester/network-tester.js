const isReachable = require("is-reachable");
const ipcMain = require("electron").ipcMain;

const Navigator = require("../navigator.js");
const { intervalTask, intervalTaskRunner } = require("./interval-task-runner.js");
const { configJSONStore } = require("../json-store/config-store.js");

// Setup Task -------------------------------------------------

let attempts = 0;

async function testConnection() {
  let uris = configJSONStore.get("kiosk_webpage_urls");
  uris = uris.map((uri) => uri.trim().toLowerCase());

  attempts = attempts + 1; // increment counter
  let promises = [];

  uris.forEach((uri) => promises.push(isReachable(uri, { timeout: 5000 })));

  let results = await Promise.all(promises);
  // console.log(`testConnection, Attempt: ${attempts}, Results of isReachable are: ${results}`);

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

module.exports = NetworkTester;
