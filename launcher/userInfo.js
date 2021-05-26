import parseInfo from "/js/parseInfo.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";
const username = Cookie.get("username").value;
const data = await fetch(`/users/${username}/info.txt`).then(data => data.text());
for (const name in parseInfo(data)) {
	console.log(name, parseInfo(data)[name]);
}