let namegoogle = ""
let emailgoogle = ""
let fakepassgoogle = ""

function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);

    namegoogle = responsePayload.given_name
    emailgoogle = responsePayload.email
    fakepassgoogle = responsePayload.sub

    joinusgoogle()
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "601643421574-p6gs3bgfechp0jub8aed16fhat2h878s.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function hashpass() {
    let pwdObj = fakepassgoogle;
    let hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashObj.update(pwdObj);
    let hash = hashObj.getHash("HEX");
    fakepassgoogle = hash;
}

var currentDate = new Date(),
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear();
const dates = (year + "-" + day + "-" + month)

function joinusgoogle() {
    hashpass()
    fetch("/newuser", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            Name: namegoogle,
            email: emailgoogle,
            password: fakepassgoogle,
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
            signingoogle()
        })
}


function signingoogle() {
    fetch("/checksignin", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email: emailgoogle,
            password: fakepassgoogle
        })
    })
        .then(async (res) => {
            if (!res.ok)
                throw await res.json()
            return res.json()
        })
        .then((data) => {
            location.href = "/session?name=" + data.msgname + "&id=" + data.msgid + "&status=" + data.msgstatus
        }).catch((err) => {
            document.getElementById("error").innerText = err.error
        })
}