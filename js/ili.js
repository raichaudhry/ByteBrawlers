import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
const {cookieConsent, Cookie} = cookies;
cookieConsent();

const ili = async () => {
	const usernameCookie = Cookie.get("username");
	const passCookie = Cookie.get("pass");
	if (!(usernameCookie && passCookie)) return false;
	const username = usernameCookie.value;
	const pass = passCookie.value;
	const passHashed = await fetch(`/users/${username}/pass.txt`).then(r => r.text()).catch(e => `${e}`);
	return passHashed == pass;
}
export default ili;