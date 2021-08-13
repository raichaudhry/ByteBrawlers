import colorScheme from "https://gavinmorrow.github.io/EasyJS/2/ui/colorScheme/index.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";

const csc =
	Cookie.get("cs").value == "" ? new Cookie("cs", "auto") : Cookie.get("cs");
document
	.querySelector(`#cs-widget-inner input[value='${csc.value}']`)
	.setAttribute("checked", "");

colorScheme.autoChange = false;

const widget = document.getElementById("cs-widget");
const inputs = widget.querySelectorAll("input");

const updateCS = () => {
	for (const input of inputs) {
		if (input.checked) csc.value = input.value;
	}
	Cookie.get("cs").value = csc.value;
	dispatchEvent(new Event("cs"));
};
updateCS();
for (const input of inputs) {
	input.addEventListener("change", updateCS);
}
matchMedia("(prefers-color-scheme: light)").addEventListener(
	"change",
	updateCS
);
