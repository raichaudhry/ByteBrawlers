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
    console.log('Welcome,' + username + '! Confirming we can reach you at ' + email)
    console.log(`Welcome to ByteBrawlers, ${name}!`);
    fetch('index.php?${email}+${name}+${username}')
};
startup();