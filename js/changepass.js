document.getElementById("submit-change-pass").onclick = function(){
    if (document.getElementById("pwd1").value.length >= 8) {
        document.getElementById("pass-error").innerText = ""
        changepass()
    } else {
        document.getElementById("pass-error").innerText = "Please a valide password 2 times"
    }
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
let ids = getCookie("id")

function changepass() {
    if (document.getElementById("pwd1").value == document.getElementById("pwd2").value) {
        hashpass()
        fetch("/checkpass", {
            method: "POST", 
            headers: {
                "content-type": "application/json" 
            },
            body: JSON.stringify({
                id: parseInt(ids),
                password: document.getElementById("pwd1").value
            })
        })
        .then(async (res) => {
            if (!res.ok)
                throw await res.json()
           return res.json()
        })
        .then((data) => {
            location.href = "/logout"
        }).catch((err) => {
            document.getElementById("error").innerText = err.error
        })
    }  else {
        document.getElementById("error").innerText = "enter the same password"
    }
    document.getElementById("pwd1").value = ""
    document.getElementById("pwd2").value = ""
}


function hashpass() {
    let pwdObj = document.getElementById('pwd1');
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pwdObj.value);
    let hash = hashObj.getHash("HEX");
    pwdObj.value = hash;
}