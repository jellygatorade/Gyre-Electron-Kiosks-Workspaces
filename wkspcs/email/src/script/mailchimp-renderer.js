function pingBtnOnClick() {
  window.electron.email.ping();
}

function getListsBtnOnClick() {
  window.electron.email.getLists();
}

const mailchimpRenderer = {
  init: function () {
    const pingBtn = document.getElementById("ping-btn");
    const getListsBtn = document.getElementById("get-lists-btn");

    pingBtn.addEventListener("click", pingBtnOnClick);
    getListsBtn.addEventListener("click", getListsBtnOnClick);

    console.log(window.electron);
  },
};

export { mailchimpRenderer };
