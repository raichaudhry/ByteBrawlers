function startup () {
    document.getElementById("challenge2").style.display = "none";
}
function signup () {
    document.getElementById("challenge2").style.display = "block";
    document.getElementById("challenge1").style.display = "none";
    let first = document.getElementById("first").value;
    let last = document.getElementById("last").value;
    let name = `${first} ${last}`;
    console.log(`Welcome, ${name}!`);
}
startup();