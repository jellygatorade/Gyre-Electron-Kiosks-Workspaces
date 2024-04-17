const domVars = {};

// Video View Instruction Text
domVars.videoViewInstructionTextParent = document.getElementById(
  "video-view-instruction-text-parent"
);
domVars.enVideoViewInstructionText = document.getElementById(
  "video-view-en-instruction-text"
);
domVars.esVideoViewInstructionText = document.getElementById(
  "video-view-es-instruction-text"
);

// Video View Player
domVars.videoViewPlayer = document.getElementById("video-view-player");
domVars.videoViewPlayerSource = document.getElementById(
  "video-view-player-source"
);

export { domVars };
