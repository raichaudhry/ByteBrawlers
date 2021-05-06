import EasyJSVersion from "https://gavinmorrow.github.io/EasyJS/main.js";
const EasyJS = await EasyJSVersion(1);
const colorScheme = EasyJS.ui.colorScheme; 
colorScheme.setColors({
	bg: "#ffffff",
	navBg: "#fefffe",
	contrastNavBg: "#555855",
	cardBg: "#efeeef",
	buttonBg: "#e0e1e0",
	divideBg: "#2c2c2c",
	alertBg: "#ffff00",

	text: "#131012",
	subText: "#535353",
	link: "#0000ff",
}, {
	bg: "#111111",
	navBg: "#181818",
	contrastNavBg: "#858885",
	cardBg: "#303130",
	buttonBg: "#383938",
	divideBg: "#d3d3d3",
	alertBg: "#aaaa00",

	text: "#ecefed",
	subText: "#acacac",
	link: "#adddad",
});

window.login = async () => {
	alert("Loging in…");
}

const togglePass = document.getElementById("pass-toggle");
togglePass.addEventListener("change", e => {
	if (togglePass.checked) document.getElementById("pass").type = "text";
	else document.getElementById("pass").type = "password";
});