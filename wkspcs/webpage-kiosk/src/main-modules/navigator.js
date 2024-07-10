// load a local file --- window.loadFile(path.join(__dirname, "/index.html")
// load a remote web address --- window.loadURL(config.KIOSK_WEBPAGE_URL)

class Navigator {
  static state = null;

  static goTo({ win, uri }) {
    uri = uri.trim().toLowerCase();
    const isWeb = uri.startsWith("http://") || uri.startsWith("https://");

    if (this.state !== uri) {
      isWeb ? win.loadURL(uri) : win.loadFile(uri);
      this.state = uri;
    }
  }
}

module.exports = Navigator;
