document.getElementById("form").onsubmit = function() {signin()};

function signin() {
    console.log("yes")
    hashpass()
    fetch("/checksignin", {
        method: "POST", 
        headers: {
            "content-type": "application/json" 
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("pwd").value
        })
    })
}

function hashpass() {
    let pwdObj = document.getElementById('pwd');
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pwdObj.value);
    let hash = hashObj.getHash("HEX");
    pwdObj.value = hash;
}