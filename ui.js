import colorScheme from "https://gavinmorrow.github.io/EasyJS/2/ui/colorScheme/index.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";
import cookieConsent from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookieConsent/index.js";

colorScheme.setColors(
	{
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
	},
	{
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
	}
);
const cs = () => {
	colorScheme.autoChange = true;
	switch (Cookie.get("cs").value) {
		case "light":
			colorScheme.set(true);
			break;
		case "dark":
			colorScheme.set(false);
			break;
		default:
		case "auto":
			colorScheme.reset();
			colorScheme.autoChange = true;
			break;
	}
};
cs();
addEventListener("cs", cs);

window.sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

window.noCache = {
	cache: "no-store",
};

window.bbSrc = "https://gavinmorrow.com/bb/src/";
window.bbData = "https://gavinmorrow.com/bb/data/";

cookieConsent();

window.warn = async (reason, time = 5000, autoHide = true) => {
	const elem = document.createElement("div");
	elem.className = "warning";
	switch (reason) {
		case "loading":
			elem.innerHTML = "Loading…";
			break;
		default:
			elem.innerHTML = reason;
			break;
	}
	document.body.appendChild(elem);
	await sleep(1); // Allow the element to be added to the DOM
	elem.style.setProperty("right", `var(--border-radius)`);
	await sleep(2000); // wait 5s for the transition to finish
	await sleep(time); // then wait the ammount of time the caller wants the alert to be shown

	const hide = () => elem.style.setProperty("right", `-100vw`);
	if (autoHide) hide();
	else return { elem, hide };
};

window.ee = (name, find = "") => {
	// First, see if you have to find the easter egg or see if it is found
	if (find === true) new Cookie(`ee-${name}`, "f");
	else if (find === false) Cookie.get(`ee-${name}`).delete();

	// Check to see if the user has found the easter egg
	const eeCookie = Cookie.get(`ee-${name}`);
	if (eeCookie.value === "f") return true;
	else return false;
};
