import cookies from "https://gavinmorrow.github.io/EasyJS/1/cookies/main.js";
const { cookieConsent, Cookie } = cookies;
cookieConsent();

const ili = async (u = null, p = null) => {
	try {
		const usernameCookie = Cookie.get("username");
		const passCookie = Cookie.get("pass");
		if (
			(usernameCookie.value === "" || passCookie.value === "") &&
			!(u || p)
		)
			return false;
		const username = u || usernameCookie.value;
		const pass = p || passCookie.value;

		return fetch(`${bbSrc}/pass.php`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `pass=${pass}&username=${username}`,
		})
			.then(r => r.text())
			.then(text => text === "1");
	} catch (e) {
		console.error("Error:", e);
		return false;
	}
};
export default ili;
