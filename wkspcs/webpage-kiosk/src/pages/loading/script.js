console.log("hello loading");
console.log(`Node version is ${window.electron.versions.node()}`);
console.log(`Chrome version is ${window.electron.versions.chrome()}`);
console.log(`Electron version is ${window.electron.versions.electron()}`);
console.log(`window.electron.isKiosk is ${window?.electron?.isKiosk}`);

// Tell main process to start is-reachable process

// if (is-reachable)
// Navigator.goTo({ win: window, uri: configJSONStore.get("kiosk_webpage_url") });

// if (!reachable)
// window remains on loading page
// Navigator.goTo({ win: window, uri: config.LOCAL_LOADING_PAGE });
