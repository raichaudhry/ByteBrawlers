import "/ui.js";
import ili from "/js/ili.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/2/cookies/main.js";
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

		// Enable going back to the launcher
		let backListener;
		const back = async () => {
			document.getElementById("main").style.opacity = "1";
			document.getElementById("main").style.zIndex = "1";
			game.style.opacity = "0";
			game.style.zIndex = "-1";
			await sleep(1000);
			document.getElementById("back").removeEventListener("click", backListener);
		}
		backListener = document.getElementById("back").addEventListener("click", back);

		// Add game style(s) and script(s) to page
		const next = async () => {
			if (gameStyleLoaded && gameScriptLoaded) {
				// Transition
				document.getElementById("main").style.opacity = "0";
				document.getElementById("main").style.zIndex = "-1";
				game.style.opacity = "1";
				game.style.zIndex = "1";
				await sleep(1000);

			}
		}
		document.getElementById("game-style").href = `/versions/${majorVersion}/${minorVersion}/style.css`;
		document.getElementById("game-script").src = `/versions/${majorVersion}/${minorVersion}/main.js`;
		let gameStyleLoaded = false, gameScriptLoaded = false;
		document.getElementById("game-style").addEventListener("load", () => {
			gameStyleLoaded = true;
			next();
		});
		document.getElementById("game-script").addEventListener("load", () => {
			gameScriptLoaded = true;
			next();
		});
	});
}

(async () => {
	if (await ili()) {
		// User is logged in.
		main();
	}else location.replace("/");
})();