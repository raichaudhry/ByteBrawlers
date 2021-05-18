var a = location.href; 
var b = a.substring(a.indexOf("?")+1);
console.log(a);
console.log(b);
if (a == "http://127.0.0.1:5500/signup/challenge2/") {
    alert("Try going to our non-dev site, at https://bb.raichaudhry.com. Thanks!")
}