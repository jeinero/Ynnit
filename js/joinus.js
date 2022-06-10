document.getElementById("button").onclick = function(){
    if (document.getElementById("name").value.length >=1 && document.getElementById("pwd").value.length >= 8 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value)) {
        document.getElementById("error").innerText = ""
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
                password: document.getElementById("pwd").value,
                date: dates
            })
        })
        .then(async (res) => {
            if (!res.ok)
                throw await res.json()
           return res.json()
        })
        .then((data) => {
            location.href = "/signin"
        }).catch((err) => {
            document.getElementById("error").innerText = err.error
        })
    }
    document.getElementById("pwd").value = ""
    document.getElementById("pwd2").value = ""
}


function hashpass() {
    let pwdObj = document.getElementById('pwd');
    let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pwdObj.value);
    let hash = hashObj.getHash("HEX");
    pwdObj.value = hash;
}

var currentDate = new Date(),
      day = currentDate.getDate(),
      month = currentDate.getMonth() + 1,
      year = currentDate.getFullYear();
const dates = ( year + "-" + day + "-" + month)