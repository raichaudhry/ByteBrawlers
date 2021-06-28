import "/ui.js";
import ili from "/js/ili.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
import Popup, {sleep} from "https://gavinmorrow.github.io/EasyJS/2/ui/popup/index.js";
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

		// Get Version #
		const v = version.value;
		const [majorVersion, minorVersion] = v.split(".");

		// Get the HTML
		const gameHTML = (await fetch(`/versions/${majorVersion}/${minorVersion}/main.html`).then(r => r.text()).catch(e => {
			alert(`There was an error. Reload the page and try again.\n\n${e}`);
			console.error(e);
		})).split("<!-- GAME HTML -->")[1];
		// Split by <!-- GAME HTMl --> to take away head and doctype ect. because it is being inserted into the page directly (not iframe)
		const game = document.getElementById("game");
		game.innerHTML = gameHTML;

		// Add game style(s) and script(s) to page
		document.getElementById("game-style").href = `/versions/${majorVersion}/${minorVersion}/style.css`;
		document.getElementById("game-script").href = `/versions/${majorVersion}/${minorVersion}/main.js`;

		// Transition
		document.getElementById("main").style.opacity = "0";
		document.getElementById("main").style.zIndex = "-1";
		game.style.opacity = "1";
		game.style.zIndex = "1";
		sleep(1000);
	});
}

(async () => {
	if (await ili()) {
		// User is logged in.
		main();
	}else location.replace("/");
})();