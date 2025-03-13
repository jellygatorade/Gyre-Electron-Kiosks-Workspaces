const isReachable = require("is-reachable");
const ipcMain = require("electron").ipcMain;

const Navigator = require("../navigator.js");
const { intervalTask, intervalTaskRunner } = require("./interval-task-runner.js");
const { configJSONStore } = require("../json-store/config-store.js");

// Setup Task -------------------------------------------------

async function testConnection() {
  let uris = configJSONStore.get("kiosk_webpage_urls");
  uris = uris.map((uri) => uri.trim().toLowerCase());

  let promises = [];

  uris.forEach((uri) => promises.push(isReachable(uri)));

  let results = await Promise.all(promises);
  // console.log(`Results of isReachable are: ${results}`);

  const allTrue = (arr) => arr.every((item) => item === true);
  let connection = allTrue(results);

  if (connection) {
    Navigator.setState({ state: Navigator.states.live });
  } else {
    Navigator.setState({ state: Navigator.states.loading });
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
