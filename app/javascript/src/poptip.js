export default function (element, func) {
  element.addEventListener("click", (e) => {
    const rect = e.target.getBoundingClientRect();

    const x = window.pageXOffset + rect.left;
    const y = window.pageYOffset + rect.top;

    let tip = document.createElement("div");
    document.body.prepend(tip);
    tip.className = "poptip-balloon";
    tip.style.left = x + 20 + "px";
    tip.style.top = y - 30 + "px";

    if (typeof func == "function") {
      func(e, tip);
    }

    setTimeout(() => {
      tip.remove();
    }, 4000);
  });
}
