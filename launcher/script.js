import "/ui.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
const {cookieConsent, Cookie} = cookies;
cookieConsent();

const login = () => location.replace("/");

const usernameCookie = Cookie.get("username");
const passCookie = Cookie.get("pass");
if (!(username && pass)) login();

const username = usernameCookie.value;
const pass = passCookie.value;
const passHashed = await fetch(`/users/${username}/pass.txt`).then(r => r.text()).catch(e => `${e}`);
if (passHashed == pass) {
	// User is logged in
}else login();