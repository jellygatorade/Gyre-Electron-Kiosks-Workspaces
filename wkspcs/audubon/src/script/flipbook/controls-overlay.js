import { dom } from "../dom.js";

const controlsOverlay = {
    init: function() {
        const boundControlsOverlayOnClick = this.controlsOverlayOnClick.bind(this);

        dom.nonlocalized.read_view.turn.controls_overlay.addEventListener("click", boundControlsOverlayOnClick);
    },

    controlsOverlayOnClick: function(event) {
        this.fadeOut(dom.nonlocalized.read_view.turn.controls_overlay);
    },

    fadeOut: function(element) {
        element.classList.remove("active");
        element.classList.add("inactive");
    }
}

export { controlsOverlay };
