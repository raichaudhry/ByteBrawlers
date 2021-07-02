import parseInfo from "/js/parseInfo.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/1/cookies/cookie/index.js";
import Popup from "https://gavinmorrow.github.io/EasyJS/2/ui/popup/index.js";
const username = Cookie.get("username").value;
const data = await fetch(`https://gavinmorrow.com/bb/data/users/${username}/info.txt`).then(data => data.text());
const parsed = parseInfo(data);
const popup = await new Popup(`
<form action="javascript:verify()">
<label for="code" title="A verification code was sent to the email you specified in the signup form. If you do not see it, check the spam or junk section.">Verification Code:</label>
<input type="number" min="10000" max="99999" id="code" placeholder="12345" required>
<br/>
<br/>
<input type="submit">
</form>
`, 0, false, undefined, true);
for (const name in parsed) {
	const [flags, data] = parsed[name];
	if (flags.indexOf("h") > -1) {
		if (name == "verif" && data != "1") {
			// The user needs to enter their verification code.
			await popup.show();
			window.verify = async () => {
				await popup.hide();
				const verif = await fetch(`${bbSrc}/verif.php`, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: `username=${username}&code=${document.getElementById("code").value}`
				}).then(r => r.text()).catch(e => alert(`The verification failed. \n${e}`));
				switch (verif) {
					case "1":
						new Popup("The verification succeeded!", 5000, true, "", true).then(popup => popup.show()).then(popup => popup.hide());
						break;
					case "0":
						alert("Incorrect verification code.");
						break;
					default:
						break;
				}
				location.reload();
			};
		}
		continue;
	}
	const elem = document.createElement("p");
	elem.innerHTML = `<div>${name}</div>: <div>${data}</div>`;
	document.getElementById("profile").appendChild(elem);
}

document.getElementById("username-output").innerHTML = username;

export default parsed;