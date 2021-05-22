import "/ui.js";
import ili from "/ili.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
const {cookieConsent, Cookie} = cookies;
cookieConsent();

(async () => {
	if (await ili()) {
		// User is logged in.
		main();
	}else location.replace("/");
})();