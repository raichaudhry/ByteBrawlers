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
    alert("Whoops! It looks like you entered different passwords for the password and confirm password fields. Please click 'OK' and try again.")
    location.reload;
    } else {
        console.log("pass test #1, passed.")
    }
    console.log('Welcome,' + username + '! Confirming we can reach you at ' + email)
    console.log(`Welcome to ByteBrawlers, ${name}!`);
    fetch('index.php?${email}+${name}+${username}+$(first)+${last}+${pass}+${confirmpass}')
    location.href="../"
};
startup();