// Request the stored data from main.js containing either default or previous input
console.log(window.electron);
const labelConfig = await window.electron.appConfig.request();
console.log(labelConfig);
