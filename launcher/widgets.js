const widgetCss = document.createElement("link");
widgetCss.rel = "stylesheet";
widgetCss.href = "./widgets.css";
document.head.appendChild(widgetCss);

const widgets = document.getElementById("widgets");
document.getElementById("hamburger").addEventListener("click", () => {
	if (widgets.getAttribute("data-hidden") == "") widgets.removeAttribute("data-hidden");
	else widgets.setAttribute("data-hidden", "");
})