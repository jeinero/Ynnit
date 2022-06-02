document.getElementById("joinus").onclick = function() {
mySubmit()
    fetch("/newUser", {
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
    .then((resp) => resp.json())
    .then((data) => {})
}


function mySubmit() {
    var pwdObj = document.getElementById('pwd');
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pwdObj.value);
    var hash = hashObj.getHash("HEX");
    pwdObj.value = hash;
  }