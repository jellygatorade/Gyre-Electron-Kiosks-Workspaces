// load a local file         --- window.loadFile(path.join(__dirname, "/index.html")
// load a remote web address --- window.loadURL(config.KIOSK_WEBPAGE_URL)

const { configJSONStore } = require("./json-store/config-store.js");

class Navigator {
  static windows = null;
  static state = null;

  static states = Object.freeze({
    live: 1,
    config: 2,
    loading: 3,
  });

  static setState({ state }) {
    if (this.state === state) {
      return; // prevent re-navigate if already in requested state
    }

    const isWeb = function (uri) {
      return uri.startsWith("http://") || uri.startsWith("https://");
    };

    // Returns a Promise that resolves after "ms" Milliseconds
    // Await the promise like ->
    // await timer(3000);
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    switch (state) {
      case this.states.live:
        // each window gets the URL assigned to it in app config

        let uris = configJSONStore.get("kiosk_webpage_urls");
        uris = uris.map((uri) => uri.trim().toLowerCase());

        // this.windows.forEach((win, index) => {
        //   let this_win_uri = uris[index];
        //   isWeb(this_win_uri) ? win.loadURL(this_win_uri) : win.loadFile(this_win_uri);
        // });

        // Load URLs with 1000ms delay between each
        // Implemented as a fix for Nuxt server 500 error
        let windows = this.windows;
        async function loadURIs() {
          for (let i = 0; i < windows.length; i++) {
            let this_win_uri = uris[i];
            isWeb(this_win_uri) ? windows[i].loadURL(this_win_uri) : windows[i].loadFile(this_win_uri);
            await timer(1000); // wait 1000ms before next iteration
          }
        }

        loadURIs();

        this.state = state;
        break;

      case this.states.config:
        // first window gets config page, the rest get config secondary page

        let primary_config_uri = configJSONStore.get("local_config_page");
        let secondary_config_uri = configJSONStore.get("local_config_page_secondary");
        primary_config_uri = primary_config_uri.trim().toLowerCase();
        secondary_config_uri = secondary_config_uri.trim().toLowerCase();

        this.windows.forEach((win, index) => {
          let config_uri;
          index === 0 ? (config_uri = primary_config_uri) : (config_uri = secondary_config_uri);
          isWeb(config_uri) ? win.loadURL(config_uri) : win.loadFile(config_uri);
        });

        this.state = state;
        break;

      case this.states.loading:
        // all windows get the loading page

        let loading_uri = configJSONStore.get("local_loading_page");
        loading_uri = loading_uri.trim().toLowerCase();

        this.windows.forEach((win, index) => {
          isWeb(loading_uri) ? win.loadURL(loading_uri) : win.loadFile(loading_uri);
        });

        this.state = state;
        break;

      default:
        console.log(`(Requested state not found in Navigator.states. Setting state to undefined.)`);
        this.state = undefined;
    }
  }
}

module.exports = Navigator;
