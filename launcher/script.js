import "/ui.js";
import ili from "/ili.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
const {cookieConsent, Cookie} = cookies;
cookieConsent();

const main = () => {
	// Add prefix
	for (const option of document.getElementById("version").querySelectorAll("option")) {
		option.textContent = `v${option.textContent}`;
	}
	// Functionality
	document.getElementById("play").addEventListener("click", () => {
		// Start Game
	});
}

(async () => {
	if (await ili()) {
		// User is logged in.
		main();
	}else location.replace("/");
})();