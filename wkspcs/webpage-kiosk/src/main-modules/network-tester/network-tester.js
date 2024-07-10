const isReachable = require("is-reachable");

const Navigator = require("../navigator.js");
const { intervalTask, intervalTaskRunner } = require("./interval-task-runner.js");
const { configJSONStore } = require("../json-store/config-store.js");
const config = require("../../config.js");

async function testConnection() {
  const connection = await isReachable(configJSONStore.get("kiosk_webpage_url"));

  if (connection) {
    Navigator.goTo({ uri: configJSONStore.get("kiosk_webpage_url") });
  } else {
    Navigator.goTo({ uri: config.LOCAL_LOADING_PAGE });
  }
}

const testConnectionTask = new intervalTask(testConnection, 1000);

class NetworkTester {
  static start() {
    intervalTaskRunner.start({ task: testConnectionTask, now: false });
  }

  static stop() {
    intervalTaskRunner.stop({ task: testConnectionTask });
  }
}

module.exports = NetworkTester;
