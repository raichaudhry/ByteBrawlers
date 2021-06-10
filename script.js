import "/ui.js";
import Popup from "https://gavinmorrow.github.io/EasyJS/1/ui/popup/index.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
import ili from "/js/ili.js";
import log from "/js/log.js";
console.log(log);

cookies.cookieConsent();
const Cookie = cookies.Cookie;
window.passInfo = async () => {
	const username = document.getElementById("username");
	const pass = document.getElementById("pass");
	const passHashed = await fetch(`http://bb-data.mateopaula.com/users/${username.value}/pass.txt`).then(r => r.text()).catch(e => `${e}`);
	const hash = string => {
		let output = "";
		for (let letter of string) {
			const binary = letter.charCodeAt(0) >>> 0;
			
			output += binary^10101010;
		}
		return output;
	};
	const popupOptions = [2500, true];
	const popup1 = new Popup(`Hello ${Cookie.get("ee-rp1").value === "f" ? "Player 1" : username.value}`, popupOptions[0]*100, false, "in");
	const popup2 = new Popup("Please enter the correct username and password.", ...popupOptions, "error");
	setTimeout(async () => {
		if (passHashed == hash(pass.value)) {

			// let apiKey = '3df9dd02daa8b5ed2d5f7b4fffe8cfc998af60bac5ff6d96f3df7cad';
			// await fetch(`https://api.ipdata.co?api-key=${apiKey}`).then(r => r.json()).then(async data => {
			// 	data.ua = navigator.userAgent;
			// 	data.action = "login";
				
			// 	const body = new FormData();
			// 	body.append("username", username.value);
			// 	body.append("data", JSON.stringify(data).replaceAll(",", ",\n").replaceAll(":", ": ").replaceAll("{", "{\n").replaceAll("}", "\n}").replaceAll("[", "[\n").replaceAll("]", "\n]"));
			// 	await fetch(`http://bb-data.mateopaula.com/php/log.php`, {
			// 		method: "POST",
			// 		body: body,
			// 	}).catch(e => {
			// 		console.error(e);
			// 	});
			// });
			log(username.value, "login");

			const month = 1000*60*60*24*7*4;
			new Cookie("username", username.value, new Date(Date.now()+month).toUTCString());
			new Cookie("pass", hash(pass.value), new Date(Date.now()+month).toUTCString());
			popup1.wrapper.style.background = "black";
			popup1.show();
			setTimeout(() => location.replace("/launcher/?sid=l"), popupOptions[0]);
		} else popup2.show();
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

if (await ili()) location.replace("/launcher");