document.getElementById("form").onsubmit = function() {joinus()};

function joinus() {
    if (document.getElementById("pwd").value == document.getElementById("pwd2").value) {
        hashpass()
        fetch("/newuser", {
            method: "POST", 
            headers: {
                "content-type": "application/json" 
            },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("pwd").value
            })
        })
    }
}


function hashpass() {
    let pwdObj = document.getElementById('pwd');
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pwdObj.value);
    let hash = hashObj.getHash("HEX");
    pwdObj.value = hash;
}