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
		// Split by <!-- GAME HTML --> to take away head and doctype ect. because it is being inserted into the page directly (not iframe)
		const game = document.getElementById("game");
		game.innerHTML = gameHTML;

		// Enable going back to the launcher
		let backListener;
		const back = async () => {
			document.getElementById("main").style.opacity = "1";
			document.getElementById("main").style.zIndex = "1";
			game.style.opacity = "0";
			game.style.zIndex = "-1";
			dispatchEvent(new Event("click")); // Close the widgets. 
			await sleep(1000);
			document.getElementById("back").removeEventListener("click", backListener);
			document.getElementById("back").style.display = "none"; // Remove the back button
		}
		backListener = document.getElementById("back").addEventListener("click", back);

		// Add game style(s) and script(s) to page
		let gameStyleLoaded = false, gameScriptLoaded = false, resolveLoading;
		warn("loading", 0, false).then(warning => {
			resolveLoading = warning.hide;
			if (gameStyleLoaded && gameScriptLoaded) resolveLoading();
		});
		const next = async () => {
			if (gameStyleLoaded && gameScriptLoaded) {
				if (resolveLoading) resolveLoading() // For the warning
				// Transition
				document.getElementById("back").style.display = "block";
				document.getElementById("main").style.opacity = "0";
				document.getElementById("main").style.zIndex = "-1";
				game.style.opacity = "1";
				game.style.zIndex = "1";
				if (ee("rp1"));
			}
		}
		
		const gameStyle = document.createElement("link");
		gameStyle.rel = "stylesheet";
		gameStyle.href = `/versions/${majorVersion}/${minorVersion}/style.css`;
		document.head.appendChild(gameStyle);

		const gameScript = document.createElement("script");
		gameScript.type = "module";
		gameScript.src = `/versions/${majorVersion}/${minorVersion}/main.js`;
		document.body.appendChild(gameScript);

		gameStyle.addEventListener("load", () => {
			gameStyleLoaded = true;
			next();
		});
		gameScript.addEventListener("load", () => {
			gameScriptLoaded = true;
			next();
		});
	});
}

(async () => {
	if (await ili()) main(); // User is logged in, so let them into page
	else location.replace("/"); // User is not logged in, so redirect to login page. 
})();