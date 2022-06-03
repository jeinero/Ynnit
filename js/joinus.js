document.getElementById("button").onclick = function(){
    if (document.getElementById("name").value.length >=1 && document.getElementById("pwd").value.length >= 8 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value)) {
        joinus()
    } else {
        document.getElementById("error").innerText = "enter a valide email and name and a password of at least 8 characters"
    }
};


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
        .then((res) => res.json())
        .then((data) => {
        console.log(data)
        if (!!data.error) {
            document.getElementById("error").innerText = data.error
            return;
        }
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