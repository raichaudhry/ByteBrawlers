import "/ui.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/2/cookies/cookie/index.js";
import Popup, {sleep} from "https://gavinmorrow.github.io/EasyJS/2/ui/popup/index.js";
const srcURL = "https://gavinmorrow.com/bb/src";
const databaseURL = "https://gavinmorrow.com/bb/data";
const friendsElem = document.getElementById("friends");
const friendsList = document.getElementById("friendsList");
const getErrorFunc = func => {
	return (e, ...args) => {
		func(e, ...args);
		console.error(e);
		return e;
	}
}
const errorFuncs = {
	friendFetch: getErrorFunc(e => friendsElem.innerHTML = `There was an error. Refresh the page and try again.<br/><br/>Error:<br/>${e}`),
	addFriend: getErrorFunc(async e => {
		const popup = await new Popup(`There was an error. Refresh the page and try again. <br/><br/>${e}`, 5000, false, true);
		await popup.show();
		await popup.hide();
	}),
	friendNoExist: getErrorFunc(async (_, username) => {
		const popup = await new Popup(`The username you inputed (${username}) does not exist.`, 5000, false, true);
		await popup.show();
		await popup.hide();
	}),
};
const username = Cookie.get("username").value;
// Fetch friends
(async () => {
	const file = await fetch(`${srcURL}/file.php?username=${username}&path=/0/&name=friends.txt`).then(r => r.text()).catch(errorFuncs.friendFetch);
	switch (file) {
		case "0":
			// Friends text file exists.
			break;
		case "1":
			// Friends file was created.
			break;
		default:
			errorFuncs.friendFetch();
			break;
	}
	await fetch(`${srcURL}/file.php?username=${username}&path=/&name=friends.txt`).catch(errorFuncs.friendFetch);
	const friendsString = await fetch(`${databaseURL}/users/${username}/friends.txt`).then(r => r.text());
	const friends = friendsString.split("\n");
	for (const friendLine of friends) {
		const [friend, flag] = friendLine.split(" ");
		if (friend.length < 1) continue;
		const item = document.createElement("li");
		item.innerHTML = `
		<span>${friend}</span>
		`.trim();
		friendsList.appendChild(item);
	}
})();
const popup = await new Popup(`Friend's Username: <input id="friend-username" type="text"><br/><br/><button id="submit-friend">Find!</button>`, 0, false, "friend-username-wrapper", true);
document.getElementById("add-friend").addEventListener("click", async () => {
	await popup.show();
	document.getElementById("submit-friend").addEventListener("click", async () => {
		const addFriend = await fetch(`${srcURL}/addFriend.php?username=${username}&fusername=${document.getElementById("friend-username").value || "parzival"}`).then(r => r.text()).catch(errorFuncs.addFriend);
		switch (addFriend) {
			case "0":
				errorFuncs.addFriend(new Error("The username does not exist."), document.getElementById("friend-username").value);
				break;
			default:
				break;
		}
		await popup.hide();
	});
});