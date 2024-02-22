window.onload = function () {
  envRenderer.init();
};

const envRenderer = {
  init: function () {
    const getNodeEnvBtn = document.getElementById("get-node-env-btn");
    const getSecretKeyBtn = document.getElementById("get-secret-key-btn");

    getNodeEnvBtn.addEventListener("click", getNodeEnvBtnOnClick);
    getSecretKeyBtn.addEventListener("click", getSecretKeyBtnOnClick);

    window.electron.env.onEnvResponse(onEnvResponse);
  },
};

// ipc  ----------------------------------------

function getNodeEnvBtnOnClick() {
  window.electron.env.getNodeEnv();
}

function getSecretKeyBtnOnClick() {
  window.electron.env.getSecretKey();
}

// ipc listener ----------------------------------------

function onEnvResponse(msg) {
  console.log(msg);
}
