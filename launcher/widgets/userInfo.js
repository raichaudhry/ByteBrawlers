import parseInfo from "/js/parseInfo.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";
const username = Cookie.get("username").value;
const data = await fetch(`/users/${username}/info.txt`).then(data => data.text());
const parsed = parseInfo(data);
for (const name in parsed) {
	const data = parsed[name];
	const elem = document.createElement("p");
	elem.innerHTML = `<div>${name}</div>: <div>${data}</div>`;
	document.getElementById("profile").appendChild(elem);
}

const profileStyle = document.createElement("style");
profileStyle.innerHTML = `#profile::before {
	--title: '${username} - Profile';
}`;
document.head.appendChild(profileStyle);