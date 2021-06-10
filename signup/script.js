import Popup from "https://gavinmorrow.github.io/EasyJS/1/ui/popup/index.js";
import ili from "/js/ili.js";
//ili stuff here
function startup () {
	// document.getElementById("challenge2").style.display = "none";
}
function json(url) {
    return fetch(url).then(res => res.json());
  }
  
  let apiKey = '3df9dd02daa8b5ed2d5f7b4fffe8cfc998af60bac5ff6d96f3df7cad';
  json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    console.log(data.ip);
    console.log(data.city);
    console.log(data.country_code);
  });
var a = location.href; 
var b = a.substring(a.indexOf("?")+1);
console.log(a);
console.log(b);
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
} else {
	// const popupOptions = [2500, true];
	// const popup2 = new Popup("Please enter the correct username and password.", ...popupOptions, "error");    }
    if (pass.length < 5) {
        alert("Uh-oh! It looks like your password is shorter than 5 characters. Please try again.");
    } else {
        console.log("pass test #2, passed.");
    }

}

console.log('Welcome,' + username + '! Confirming we can reach you at ' + email);
console.log(`Welcome to ByteBrawlers, ${name}!`);
let php = fetch(`http://bbdata.mateopaula.com/php/signup.php?${email}+${name}+${username}+${first}+${last}+${pass}+${confirmpass}`);
location.href=("../");
}