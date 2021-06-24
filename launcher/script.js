import "/ui.js";
import ili from "/js/ili.js";
import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
import Popup from "https://gavinmorrow.github.io/EasyJS/2/ui/popup/index.js";
const {cookieConsent, Cookie} = cookies;
cookieConsent();

const main = () => {
	const version = document.getElementById("version");
	const play = document.getElementById("play");
	// Add prefix
	for (const v of version.querySelectorAll("option")) {
		v.value = v.textContent;
		v.textContent = `v${v.textContent}`;
	}
	// Functionality
	play.addEventListener("click", () => {
		// Start Game
		const popupOptions = [2500, true];
		const popup1 = new Popup("Ready Player 1", popupOptions[0], false, "rp1");
		setTimeout(async () => {
			popup1.wrapper.style.background = "black";
			if (Cookie.get("ee-rp1").value === "f") {
				await popup1.show();
				await popup1.hide();
			}
			location.replace(`/versions/${version.value}/`);
		});
	});
}

(async () => {
	if (await ili()) {
		// User is logged in.
		main();
	}else location.replace("/");
})();

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
const fetchFriends = async () => {
	const file = await fetch(`${srcURL}/file.php?username=${username}&path=/&name=friends.txt`).then(r => r.text()).catch(errorFuncs.friendFetch);
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
	const friendsString = await fetch(`${databaseURL}/users/${username}/friends.txt`).then(r => r.text());
	const friends = friendsString.split("\n");
	friendsList.innerHTML = friendsListInitInnerHTML;
	for (const friendLine of friends) {
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
				default:
					break;
				}
			await popup.hide();
			document.getElementById("friend-username").value = "";
		});
	}
}
addEventListener("click", addFriend);