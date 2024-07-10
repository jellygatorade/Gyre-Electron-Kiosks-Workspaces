// load a local file --- window.loadFile(path.join(__dirname, "/index.html")
// load a remote web address --- window.loadURL(config.KIOSK_WEBPAGE_URL)

class Navigator {
  static win = null;
  static state = null;

  static goTo({ uri }) {
    uri = uri.trim().toLowerCase();
    const isWeb = uri.startsWith("http://") || uri.startsWith("https://");

    if (this.state !== uri) {
      isWeb ? this.win.loadURL(uri) : this.win.loadFile(uri);
      this.state = uri;
    }
  }
}

module.exports = Navigator;
