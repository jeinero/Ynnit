document.getElementById("button").onclick = function(){
    if (document.getElementById("pwd").value.length >= 8 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value)) {
        document.getElementById("error").innerText = ""
        signin()
    } else {
        document.getElementById("error").innerText = "enter a valide email and a password of at least 8 characters"
    }
};


function signin() {
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
    .then(async (res) => {
        if (!res.ok)
            throw await res.json()
       return res.json()
    })
    .then((data) => {
        location.href = "/session?name="+data.msgname+"&id="+data.msgid
    }).catch((err) => {
        document.getElementById("error").innerText = err.error
    })
    document.getElementById("pwd").value = ""
}

function hashpass() {
    let pwdObj = document.getElementById('pwd');
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pwdObj.value);
    let hash = hashObj.getHash("HEX");
    pwdObj.value = hash;
}