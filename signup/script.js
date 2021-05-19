function startup () {
    document.getElementById("challenge2").style.display = "none";
}
function signup () {
    document.getElementById("challenge2").style.display = "block";
    document.getElementById("challenge1").style.display = "none";
    let first = document.getElementById("first").value;
let last = document.getElementById("last").value;
let name = first+last;
console.log("Welcome, " + first + " " + last + "!");
}
startup();
// // import "https://gavinmorrow.github.io/EasyJS/0/main.js";
// // import "../script.js"
// let test;
// console.log(test)

// function setCookies () {
// document.cookie = "name=a";
// setCookies(name, name);
// var cookie = document.cookie;
// console.log(cookie);
// }
// while (true) {
// if (first != test) {
//     setCookies();
// }
// }
// function submit () {
//     alert("Submitting your login request.");
    
// }
