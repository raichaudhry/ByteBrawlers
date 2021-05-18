// import "https://gavinmorrow.github.io/EasyJS/0/main.js";
// import "../script.js"
let test;
console.log(test)
let first = document.getElementById("first").value;
let last = document.getElementById("last").value;
let name = first+last;
console.log("Welcome, " + first + " " + last + "!");
function setCookies () {
document.cookie = "name=a";
setCookies(name, name);
var cookie = document.cookie;
console.log(cookie);
}
while (true) {
if (first != test) {
    setCookies();
}
}
