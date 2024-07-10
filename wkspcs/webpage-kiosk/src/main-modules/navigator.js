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
