import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";
import Popup from "https://gavinmorrow.github.io/EasyJS/1/ui/popup/index.js";

const popupOptions = [2500, true];
const popup1 = new Popup(`${Cookie.get("ee-rp1").value === "f" ? "" : "Get "}Ready ${Cookie.get("ee-rp1").value === "f" ? "Player 1" : Cookie.get("username").value}`, popupOptions[0] / 2, false, "rp1");
popup1.wrapper.style.background = "black";
await popup1.show();
popup1.hide();