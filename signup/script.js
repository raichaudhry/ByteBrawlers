import Popup from "https://gavinmorrow.github.io/EasyJS/1/ui/popup/index.js";
import ili from "/js/ili.js";
function startup () {
	// document.getElementById("challenge2").style.display = "none";
}
window.submit = function () {
	document.getElementById("challenge1").style.display = "none";
	let first = document.getElementById("first").value;
	let last = document.getElementById("last").value;
	let name = `${first} ${last}`;
	let username = document.getElementById("username").value;
	let email = document.getElementById("email").value;
	let pass = document.getElementById("pass").value;
	let confirmpass = document.getElementById("confirmpass").value;
	if (pass !== confirmpass) {  
		alert("Whoops! It looks like you entered different passwords for the password and confirm password fields. Please click 'OK' and try again.");
		break;
	} else {
		// const popup2 = new Popup("Please enter the correct username and password.", 2500, true, "error");
		if (pass.length < 5) {
			alert("Uh-oh! It looks like your password is shorter than 5 characters. Please try again.");
			break;
		} else {
			console.log("pass test #2, passed.");
		}
	}
}
console.log('Welcome,' + username + '! Confirming we can reach you at ' + email);
console.log(`Welcome to ByteBrawlers, ${name}!`);
let php = await fetch(`http://bbdata.mateopaula.com/php/signup.php?${email}+${name}+${username}+${first}+${last}+${pass}+${confirmpass}`);
location.href=("../");
(async () => {
	if (await ili()) location.replace("/launcher");
})();