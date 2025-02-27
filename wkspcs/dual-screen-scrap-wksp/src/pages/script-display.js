// DOM --------------------------------------------------------------

// Event Listeners --------------------------------------------------

// BroadcastChannel -------------------------------------------------

const broadcast = new BroadcastChannel("message_broadcast");
broadcast.onmessage = handleNewMessage;

function handleNewMessage(event) {
  let message = event.data;

  switch (message.type) {
    case "response":
      console.log(`Display new response to prompt ${message.prompt} - ${message.response}`);
      break;
    case "video":
      console.log(`Start a video!`);
      break;
  }
}
