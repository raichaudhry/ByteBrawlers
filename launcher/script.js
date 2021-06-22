import "/ui.js";
import ili from "/js/ili.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
import Popup from "https://gavinmorrow.github.io/EasyJS/2/ui/popup/index.js";
const {cookieConsent, Cookie} = cookies;
cookieConsent();

const main = () => {
	const version = document.getElementById("version");
	const play = document.getElementById("play");
	// Add prefix
	for (const v of version.querySelectorAll("option")) {
		v.value = v.textContent;
		v.textContent = `v${v.textContent}`;
	}
	// Functionality
	play.addEventListener("click", () => {
		// Start Game
		const popupOptions = [2500, true];
		const popup1 = new Popup("Ready Player 1", popupOptions[0], false, "rp1");
		setTimeout(async () => {
			popup1.wrapper.style.background = "black";
			if (Cookie.get("ee-rp1").value === "f") {
				await popup1.show();
				await popup1.hide();
			}
			location.replace(`/versions/${version.value}/`);
		});
	});
}

(async () => {
	if (await ili()) {
		// User is logged in.
		main();
	}else location.replace("/");
})();