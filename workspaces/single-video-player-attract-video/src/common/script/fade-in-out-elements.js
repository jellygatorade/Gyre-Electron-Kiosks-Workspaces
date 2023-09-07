function fadeIn(element) {
  element.classList.remove("opacity-0");
  element.classList.remove("invisible");
  element.classList.remove("pointer-events-none");
  element.classList.add("opacity-100");
  element.classList.add("visible");
}

function fadeOut(element) {
  element.classList.remove("opacity-100");
  element.classList.remove("visible");
  element.classList.add("opacity-0");
  element.classList.add("invisible");
  element.classList.add("pointer-events-none");
}

export { fadeIn, fadeOut };
