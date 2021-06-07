import colorScheme from "https://gavinmorrow.github.io/EasyJS/1/ui/colorScheme/index.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";

const csc = Cookie.get("cs").value == "" ? new Cookie("cs", "auto") : Cookie.get("cs");
document.querySelector(`#cs-widget-inner input[value='${csc.value}']`).setAttribute("checked", "");

colorScheme.autoChange = false;

const widget = document.getElementById("cs-widget");
const inputs = widget.querySelectorAll("input");

const updateCS = () => {
	for (const input of inputs) {
		if (input.checked) csc.value = input.value;
	}
	switch (csc.value) {
		case "light":
			colorScheme.set(true);
			break;
		case "dark":
			colorScheme.set(false);
			break;
		default:
			colorScheme.reset();
	}
}
updateCS();
for (const input of inputs) {
	input.addEventListener("change", updateCS);
}
matchMedia("(prefers-color-scheme: light)").addEventListener("change", updateCS);