class view {
  constructor(root) {
    this.root = root;
  }

  // also attach any properites specific to the UI view here?
  // maybe specify a pre or post transition action
  // a property that describes the length of its transition
  // or the type of transition (fade, slide, etc)
  // these would be read by animation-handler

  // the only other things the unity example has are
  // pre-post transition audio clips
  // enter-exit directions if transition mode is slide in/out

  preEnterAction = function () {
    console.log(`${this.root.id} about to enter!`);
  };

  postEnterAction = function () {
    console.log(`${this.root.id} entered!`);
  };

  preExitAction = function () {
    console.log(`${this.root.id} about to exit!`);
  };

  postExitAction = function () {
    console.log(`${this.root.id} exited!`);
  };
}

export { view };
