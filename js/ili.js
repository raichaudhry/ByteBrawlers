import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
const {cookieConsent, Cookie} = cookies;
cookieConsent();

const ili = async () => {
	try {
		const usernameCookie = Cookie.get("username");
		const passCookie = Cookie.get("pass");
		if (usernameCookie.value === "" || passCookie.value === "") return false;
		const username = usernameCookie.value;
		const pass = passCookie.value;
		const passHashed = await fetch(`http://gavinmorrow.com/bb/data/users/${username}/pass.txt`).then(r => r.text()).catch(console.error);
		return passHashed == pass;
	}catch (e) {
		console.error(e);
		return false;
	}
}
export default ili;