// DOM --------------------------------------------------------------

const sendMsgForm = document.getElementById("send-msg-form");
const startVideoBtn = document.getElementById("start-video-btn");

// Init - BroadcastChannel ------------------------------------------

const broadcast = new BroadcastChannel("message_broadcast");
// broadcast.onmessage = handleNewMessage;

// function handleNewMessage(event) {
//   console.log(event);
//   console.log(`Message from the channel: ${event.data}`);
// }

// Event Listeners --------------------------------------------------

sendMsgForm.addEventListener("submit", sendNewMessage);
startVideoBtn.addEventListener("click", sendStartVideo);

function sendNewMessage(event) {
  event.preventDefault(); // prevent POST submit
  let message_text = event.target.elements.message.value; // get the text string

  let message = {
    type: "response",
    prompt: 0,
    response: message_text,
  };

  broadcast.postMessage(message);
}

function sendStartVideo(event) {
  event.preventDefault(); // prevent POST submit

  let message = {
    type: "video",
  };

  broadcast.postMessage(message);
}
