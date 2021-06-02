import Popup from "https://gavinmorrow.github.io/EasyJS/1/ui/popup/index.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";

const params = new URLSearchParams(location.search);
const sid = params.get("sid");
if (sid == "l") {
	const username = Cookie.get("username");
	const popup1 = new Popup(`Hello ${Cookie.get("ee-rp1").value === "f" ? "Player 1" : username.value}`, 0, true, "in");
	popup1.wrapper.style.background = "black";
	popup1.show();
}