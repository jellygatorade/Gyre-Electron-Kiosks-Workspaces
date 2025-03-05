const isReachable = require("is-reachable");
const ipcMain = require("electron").ipcMain;

const Navigator = require("../navigator.js");
const { intervalTask, intervalTaskRunner } = require("./interval-task-runner.js");
const { configJSONStore } = require("../json-store/config-store.js");

// Setup Task -------------------------------------------------

async function testConnection() {
  const connection = await isReachable(configJSONStore.get("kiosk_webpage_url"));

  if (connection) {
    Navigator.goTo({ uri: configJSONStore.get("kiosk_webpage_url") });
  } else {
    Navigator.goTo({ uri: configJSONStore.get("local_loading_page") });
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
    console.log(`(Starting network tests to ${configJSONStore.get("kiosk_webpage_url")} at interval of ${testConnectionTask.intervalTime}ms)`);
    intervalTaskRunner.start({ task: testConnectionTask, immediately: true });
  }

  static stop() {
    console.log(`(Stopping network tests to ${configJSONStore.get("kiosk_webpage_url")})`);
    intervalTaskRunner.stop({ task: testConnectionTask });
  }
}

module.exports = NetworkTester;
