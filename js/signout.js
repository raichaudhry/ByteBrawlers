import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";
import log from "https://gavinmorrow.com/bb-src/log.js";

const signout = async () => {
	await log(Cookie.get("username").value, "signout");
	Cookie.get("username").delete();
	Cookie.get("pass").delete();
	location.replace("/");
	return true;
}
document.getElementById("signout").addEventListener("click", signout);