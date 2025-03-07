// load a local file         --- window.loadFile(path.join(__dirname, "/index.html")
// load a remote web address --- window.loadURL(config.KIOSK_WEBPAGE_URL)

const { configJSONStore } = require("./json-store/config-store.js");

// to do
// uri = uri.trim().toLowerCase();
// if (this.state !== state) ...
// NetworkTester needs to test all uris?

class Navigator {
  static windows = null;
  static state = null;

  static states = Object.freeze({
    live: 1,
    config: 2,
    loading: 3,
  });

  static setState({ state }) {
    const isWeb = function (uri) {
      return uri.startsWith("http://") || uri.startsWith("https://");
    };

    switch (state) {
      case this.states.live:
        // each window gets the URL assigned to it in app config
        const uris = configJSONStore.get("kiosk_webpage_urls");
        this.windows.forEach((win, index) => {
          const this_win_uri = uris[index];
          isWeb(this_win_uri) ? win.loadURL(this_win_uri) : win.loadFile(this_win_uri);
        });
        break;

      case this.states.config:
        // first window gets config page, the rest get config secondary page
        const primary_config_uri = configJSONStore.get("local_config_page");
        const secondary_config_uri = configJSONStore.get("local_config_page_secondary");
        this.windows.forEach((win, index) => {
          let config_uri;
          index === 0 ? (config_uri = primary_config_uri) : (config_uri = secondary_config_uri);
          isWeb(config_uri) ? win.loadURL(config_uri) : win.loadFile(config_uri);
        });
        break;

      case this.states.loading:
        // all windows get the loading page
        const loading_uri = configJSONStore.get("local_loading_page");
        this.windows.forEach((win, index) => {
          isWeb(loading_uri) ? win.loadURL(loading_uri) : win.loadFile(loading_uri);
        });
        break;

      default:
        console.log(`(Requested state not found in Navigator.states)`);
    }
  }

  // static goTo({ uri }) {
  //   uri = uri.trim().toLowerCase();
  //   const isWeb = uri.startsWith("http://") || uri.startsWith("https://");

  //   if (this.state !== uri) {
  //     // console.log(this.windows);
  //     // isWeb ? this.windows.loadURL(uri) : this.windows.loadFile(uri);
  //     console.log(uri);
  //     console.log(isWeb);
  //     isWeb ? this.windows.forEach((win) => win.loadURL(uri)) : this.windows.forEach((win) => win.loadFile(uri));
  //     this.state = uri;
  //   }
  // }
}

module.exports = Navigator;
