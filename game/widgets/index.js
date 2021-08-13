const widgetCss = document.createElement("link");
const widgets = document.getElementById("widgets");
const widgetsWrapper = document.getElementById("widgets-wrapper");

// Add widget stylesheet
widgetCss.rel = "stylesheet";
widgetCss.href = "./widgets/style.css";
document.head.appendChild(widgetCss);

// Abstractions
const close = () => widgetsWrapper.setAttribute("data-hidden", "");
const open = () => widgetsWrapper.removeAttribute("data-hidden");
const isClosed = () => widgetsWrapper.getAttribute("data-hidden") == "";
const isOpen = () => !isClosed();

// Functionality
document.getElementById("hamburger").addEventListener("click", () => {
	// Open the widgets if it is not aready open, otherwise close them.
	// Although you can only see the button if the widgets are closed, you can keep your selection on it (so this is better for accessibility).
	if (isClosed()) open();
	else close();
});
addEventListener("click", e => {
	// If you click outside of the widgets, then close the widgets.
	if (
		!(e.target instanceof Node) ||
		!(widgetsWrapper.contains(e.target) || e.target == widgetsWrapper)
	)
		close();
});
