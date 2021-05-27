import colorScheme from "https://gavinmorrow.github.io/EasyJS/1/ui/colorScheme/index.js";

const widgets = document.getElementById("widgets");
const widget = document.createElement("section");

widget.id = "colorScheme";
widget.className = "widget";
widget.innerHTML = "Color Scheme"; // Make this the title

widgets.appendChild(widget);