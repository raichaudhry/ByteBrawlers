import colorScheme from "https://gavinmorrow.github.io/EasyJS/1/ui/colorScheme/index.js";
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
	const username = document.getElementById("username");
	const pass = document.getElementById("pass");
	const pop = document.getElementById("error");
	const wrapper = document.getElementById("error").parentElement;
	const passHashed = await fetch(`/users/${username.value}/pass.txt`).then(r => r.text());
	const hash = string => {
		let output = "";
		for (let letter of string) {
			const binary = letter.charCodeAt(0) >>> 0;
			
			output += binary^10101010;
		}
		return output;
	};
	const popup = up => {
		pop.innerHTML = up;
		wrapper.style.zIndex = "1000";
		wrapper.style.opacity = "1";
		setTimeout(() => {
			// wrapper.style.opacity = "0";
			// setTimeout(() => {
			// 	wrapper.style.zIndex = "-1000";
			// }, 1000);
		}, 5000);
	}
	if (passHashed == hash(pass.value)) popup("Logged in!");
	else popup("Nope!");
}

const passToggle = document.getElementById("pass-toggle");
passToggle.addEventListener("change", e => {
	if (passToggle.checked) document.getElementById("pass").type = "text";
	else document.getElementById("pass").type = "password";
});
passToggle.style.setProperty("--size", getComputedStyle(document.getElementById("pass-toggle-label")).fontSize);