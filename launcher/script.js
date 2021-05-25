import "/ui.js";
import ili from "/ili.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
const {cookieConsent, Cookie} = cookies;
cookieConsent();

const main = () => {
	const versions = document.getElementById("version");
	const widgets = document.getElementById("widgets");
	const play = document.getElementById("play");
	// Add prefix
	for (const version of versions.querySelectorAll("option")) {
		version.textContent = `v${version.textContent}`;
	}
	// Functionality
	play.addEventListener("click", () => {
		// Start Game
		widgets.setAttribute("data-hidden", "");
	});
}
const resize = () => {
	// Prepare Widgets 
	widgets.style.right = `${innerWidth - (widgets.offsetLeft + widgets.offsetWidth)}px`;
}
addEventListener("resize", resize);

(async () => {
	if (await ili()) {
		// User is logged in.
		main();
	}else location.replace("/");
})();