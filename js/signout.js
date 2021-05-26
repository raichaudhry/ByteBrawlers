import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";

const signout = () => {
	Cookie.get("username").delete();
	Cookie.get("pass").delete();
	location.reload();
	return true;
}
document.getElementById("signout").addEventListener("click", signout);