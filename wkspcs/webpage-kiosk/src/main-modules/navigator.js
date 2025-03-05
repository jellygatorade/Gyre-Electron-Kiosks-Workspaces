// load a local file --- window.loadFile(path.join(__dirname, "/index.html")
// load a remote web address --- window.loadURL(config.KIOSK_WEBPAGE_URL)

class Navigator {
  static windows = null;
  static state = null;

  static goTo({ uri }) {
    uri = uri.trim().toLowerCase();
    const isWeb = uri.startsWith("http://") || uri.startsWith("https://");

    if (this.state !== uri) {
      // console.log(this.windows);
      // isWeb ? this.windows.loadURL(uri) : this.windows.loadFile(uri);
      isWeb ? this.windows.forEach((win) => win.loadURL(uri)) : this.windows.forEach((win) => win.loadFile(uri));
      this.state = uri;
    }
  }
}

module.exports = Navigator;
