import colorScheme from "https://gavinmorrow.github.io/EasyJS/1/ui/colorScheme/index.js";

colorScheme.autoChange = false;

const widget = document.getElementById("cs-widget");
const inputs = widget.querySelectorAll("input");

const updateCS = () => {
	for (const input of inputs) {
		if (input.checked) {
			switch (input.value) {
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
	}
}
updateCS();
for (const input of inputs) {
	input.addEventListener("change", updateCS);
}
matchMedia("(prefers-color-scheme: light)").addEventListener("change", updateCS);