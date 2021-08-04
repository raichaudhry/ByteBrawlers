import Cookie from "https://gavinmorrow.github.io/EasyJS/2/cookies/cookie/index.js";
import Popup, {sleep} from "https://gavinmorrow.github.io/EasyJS/2/ui/popup/index.js";
import NamedError from "https://gavinmorrow.github.io/EasyJS/2/errors/namedError/index.js";
import "/ui.js";

window.Popup = Popup;

const srcURL = "https://gavinmorrow.com/bb/src";
const databaseURL = "https://gavinmorrow.com/bb/data";
const friendsElem = document.getElementById("friends");
const friendsList = document.getElementById("friendsList");
const friendsListInitInnerHTML = friendsList.innerHTML;
const getErrorFunc = func => {
	return (e, ...args) => {
		func(e, ...args);
		console.error(e);
		return e;
	}
}
window.errorFuncs = {
	friendFetch: getErrorFunc(e => friendsElem.innerHTML = `There was an error. Refresh the page and try again.<br/><br/>${e}`),
	addFriend: getErrorFunc(async e => {
		const popup = await new Popup(`There was an error. Refresh the page and try again. <br/><br/>${e}`, 5000, false, "", true);
		await popup.show();
		await popup.hide();
	}),
	friendNoExist: getErrorFunc(async (_, username) => {
		new Popup(`The username you inputed (${username}) does not exist.`, 5000, false, "", true)
		.then(popup => popup.show())
		.then(popup => popup.hide());
	}),
	alreadyFriend: getErrorFunc((_, username) => {
		new Popup(`You are already friends with ${username}.`, 5000, false, "", true)
		.then(popup => popup.show())
		.then(popup => popup.hide());
	}),
};
const username = Cookie.get("username").value;
// Fetch friends
const fetchFriends = async () => {
	const file = await fetch(`${srcURL}/file.php?username=${username}&path=/&name=friends.txt`).then(r => r.text(), noCache).catch(errorFuncs.friendFetch);
	switch (file) {
		case "0":
			// Friends text file exists.
			break;
		case "1":
			// Friends file was created.
			break;
		default:
			errorFuncs.friendFetch(new NamedError("UnknownFetchError"));
			break;
	}
	const friendsString = await fetch(`${databaseURL}/users/${username}/friends.txt`).then(r => r.text());
	const friends = friendsString.split("\n");
	friendsList.innerHTML = friendsListInitInnerHTML;
	for (const friendLine of friends) {
		// TODO: Add support for pending friends and friend flags (and remove friend).
		const [friend, flag] = friendLine.split(" ");
		if (friend.length < 1) continue;
		const item = document.createElement("li");
		item.innerHTML = `
		<span>${friend}</span>
		`.trim();
		friendsList.appendChild(item);
	}
};
fetchFriends();
const popup = await new Popup(`
Friend's Username: <form action='javascript:addFriend()'>
	<input id="friend-username" type="text" required><br/><br/><input type='submit' id="submit-friend" value='Find!'>
</form>
`, 0, false, "friend-username-wrapper", true);
const addFriend = async e => {
	if (e.target == document.getElementById("add-friend")) {
		await popup.show();
		document.getElementById("submit-friend").addEventListener("click", async () => {
			document.getElementById("submit-friend").setAttribute("disabled", "");
			const addFriend = await fetch(`${srcURL}/addFriend.php?username=${username}&fusername=${document.getElementById("friend-username").value || "parzival"}`, {
				cache: "no-store",
			}).then(r => r.text()).catch(errorFuncs.addFriend);
			switch (addFriend) {
				case "0":
					errorFuncs.addFriend(new Error("The username does not exist."), document.getElementById("friend-username").value);
					break;
				case "1":
					fetchFriends();
					break;
				case "2":
					errorFuncs.alreadyFriend(new Error(`Already friends with ${document.getElementById("friend-username").value}.`), document.getElementById("friend-username").value);
					break;
				default:
					break;
				}
			await popup.hide();
			document.getElementById("friend-username").value = "";
			document.getElementById("submit-friend").removeAttribute("disabled");
		});
	}
}
addEventListener("click", addFriend);
setInterval(fetchFriends, 1000 * 60); // Refresh every minute

document.getElementById("enter-brawlosseum").addEventListener("click", async () => {
	const brawlosseum = document.getElementById("brawlosseum");
	brawlosseum.style.zIndex = "1";
	brawlosseum.style.opacity = "1";
	document.getElementById("game").style.opacity = "0";
	await sleep(1000);
});