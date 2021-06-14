import "/ui.js";
import Popup from "https://gavinmorrow.github.io/EasyJS/2/ui/popup/index.js";
import cookieConsent from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookieConsent/index.js";
cookieConsent();
const popups = {
	verifyFailed: new Popup("The passwords do not match!", 5000, false, "error-verifyFailed"),
	accountCreated: new Popup("Your account was created!", 5000),
	somethingWentWrong: new Popup("Something went wrong. Reload the page and try again.", 5000, false, "error-somethingWentWrong"),
	existingAccount: new Popup("Someone else is already using that username. Please enter a new one.", 5000, false, "error-existingAccount"),
	existingParzivalAccount: new Popup("That username is already in use.", 2500, false, "error-existingAccount"),
	usernameInvalid: new Popup("Your username can only contain latin letters and numbers.", 5000, false, "error-usernameInvalid"),
}
window.signup = async () => {
	document.getElementById("submit").setAttribute("disabled", "");

	const form = document.getElementById("form");
	const username = document.getElementById("username");
	const pass = document.getElementById("password");
	const passV = document.getElementById("passwordV");
	const email = document.getElementById("email");

	if (pass.value !== passV.value) {
		await popups.verifyFailed.show();
		passV.value = "";
		await popups.verifyFailed.hide();
		document.getElementById("submit").removeAttribute("disabled");
		return false;
	}
	if (/\s/.test(username.value)) {
		await popups.usernameInvalid.show();
		passV.value = "";
		await popups.usernameInvalid.hide();
		document.getElementById("submit").removeAttribute("disabled");
		return false;
	}
	if (username.value.toLowerCase() == "parzival") {
		await popups.existingParzivalAccount.show();
		username.value = "";
		await popups.existingParzivalAccount.hide();
		document.getElementById("submit").removeAttribute("disabled");
		return false;
	}
	
	const data = new FormData(form);
	data.set("pass", hash(data.get("password")));

	const evaluatePhp = async (php) => {
		const show_hide = async popup => {
			await popups[popup].show();
			await popups[popup].hide();
			return true;
		}
		switch (php) {
			case "00":
				await popups.accountCreated.show();
				location.href = "/";
				break;
			case "01":
				await show_hide("existingAccount");
			case "02":
				await show_hide("verifyFailed");
			default:
				await show_hide("somethingWentWrong");
				break;
		}
		return php;
	}
	const phpFetch = await fetch("https://gavinmorrow.com/bb/src/signup.php", {
		method: "POST",
		body: data,
	}).catch(e => {
		console.error(e);
		const php = "";
		evaluatePhp(php);
	});
	const php = await phpFetch.text();
	evaluatePhp(php);
	document.getElementById("submit").removeAttribute("disabled");
}