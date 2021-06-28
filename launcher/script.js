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
	play.addEventListener("click", async () => {
		if (Cookie.get("ee-rp1").value === "f") {
			const popupOptions = [2500, true];
			const popup1 = await new Popup("Ready Player 1", popupOptions[0], false, "rp1", true);
			popup1.wrapper.style.background = "black";
			await popup1.show();
			await popup1.hide();
		}
		// Start Game
		const v = version.value;
		const [majorVersion, minorVersion] = v.split(".");
		const gameHTML = await fetch(`/versions/${majorVersion}/${minorVersion}/main.html`).then(r => r.text()).catch(e => {
			alert(`There was an error. Reload the page and try again.\n\n${e}`);
			console.error(e);
		});
		const game = document;
	});
}

(async () => {
	if (await ili()) {
		// User is logged in.
		main();
	}else location.replace("/");
})();