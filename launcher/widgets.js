const widgetCss = document.createElement("link");
widgetCss.rel = "stylesheet";
widgetCss.href = "./widgets.css";
document.head.appendChild(widgetCss);

const widgets = document.getElementById("widgets");
const widgetsWrapper = document.getElementById("widgets-wrapper");

const close = () => widgetsWrapper.setAttribute("data-hidden", "");
const open = () => widgetsWrapper.removeAttribute("data-hidden");
const isClosed = () => widgetsWrapper.getAttribute("data-hidden") == "";
const isOpen = () => !isClosed();

document.getElementById("hamburger").addEventListener("click", () => {
	if (isClosed()) open();
	else close();
});
addEventListener("click", e => {
	// If the element clicked is NOT a decendant of (or actually is) widgetsWrapper, then hide the widgets. 
	if (!(widgetsWrapper.contains(e.target) || e.target == widgetsWrapper)) close();
});