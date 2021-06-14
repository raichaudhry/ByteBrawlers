import "/ui.js";
import Cookie from "https://gavinmorrow.github.io/EasyJS/2/cookies/cookie/index.js";
import Popup, {sleep as wait} from "https://gavinmorrow.github.io/EasyJS/2/ui/popup/index.js";
const srcURL = "https://gavinmorrow.com/bb/src";
const databaseURL = "https://gavinmorrow.com/bb/data";
const friendsElem = document.getElementById("friends");
const friendsList = document.getElementById("friendsList");
const errorFuncs = {};
const username = Cookie.get("username").value;
errorFuncs.friendFetch = e => {
	friendsElem.innerHTML = `There was an error. Refresh the page and try again.<br/><br/>Error:<br/>${e}`;
	console.error(e);
	return e;
}
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
	const friendsString = await fetch(`${databaseURL}/users/${username}/0/friends.txt`).then(r => r.text());
	const friends = friendsString.split(" ");
	for (const friend of friends) {
		if (friend.length < 1) continue;
		const item = document.createElement("li");
		item.innerHTML = `
		<span>${friend}</span>
		`.trim();
		friendsList.appendChild(item);
	}
})();
document.getElementById("add-friend").addEventListener("click", async () => {
	const popup = await new Popup(`Friend's Username: <input id="friend-username" type="text"><br/><br/><button id="submit-friend">Find!</button>`, 0, false, "friend-username-wrapper", true);
	await popup.show();
	document.getElementById("submit-friend").addEventListener("click", () => {
		const addFriend = await fetch(`${srcURL}/addFriend.php?username=${username}&fusername=${document.getElementById("friend-username").value}`);
	});
});