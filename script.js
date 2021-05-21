import colorScheme from "https://gavinmorrow.github.io/EasyJS/1/ui/colorScheme/index.js";
import Popup from "https://gavinmorrow.github.io/EasyJS/1/ui/popup/index.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
colorScheme.setColors({
	bg: "#12c0ff",
	navBg: "#10befd",
	contrastNavBg: "#043b6c",
	cardBg: "#32e0ff",
	buttonBg: "#22d0ef",
	divideBg: "#2c2c2c",
	alertBg: "#ffff00",

	text: "#063d6e",
	subText: "#535353",
	link: "#0000ff",
}, {
	bg: "#063d6e",
	navBg: "#043b6c",
	contrastNavBg: "#10befd",
	cardBg: "#265d8e",
	buttonBg: "#32699a",
	divideBg: "#d3d3d3",
	alertBg: "#aaaa00",

	text: "#12c0ff",
	subText: "#acacac",
	link: "#adddad",
},);
cookies.cookieConsent();
const Cookie = cookies.Cookie;
const login = () => {

}
window.passInfo = async () => {
	const username = document.getElementById("username");
	const pass = document.getElementById("pass");
	const passHashed = await fetch(`/users/${username.value}/pass.txt`).then(r => r.text()).catch(e => `${e}`);
	const hash = string => {
		let output = "";
		for (let letter of string) {
			const binary = letter.charCodeAt(0) >>> 0;
			
			output += binary^10101010;
		}
		return output;
	};
	const popupOptions = [2500, true];
	const popup1 = new Popup("Logged in!", ...popupOptions, "in");
	const popup2 = new Popup("Please enter the correct username and password.", ...popupOptions, "error");
	setTimeout(async () => {
		if (passHashed == hash(pass.value)) {
			await popup1.show();
			await popup1.hide();
			location.replace("/launcher/");
		}
		else popup2.show();
	}, 100);
}

const passToggle = document.getElementById("pass-toggle");
passToggle.addEventListener("change", e => {
	if (passToggle.checked) {
		document.getElementById("pass").type = "text";
		document.getElementById("pass-toggle-label").innerHTML = "Hide Password";
	} else {
		document.getElementById("pass").type = "password";
		document.getElementById("pass-toggle-label").innerHTML = "Show Password";
	}
});
addEventListener("load", () => passToggle.style.setProperty("--size", getComputedStyle(document.getElementById("pass-toggle-label")).fontSize));