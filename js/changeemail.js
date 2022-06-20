document.getElementById("submit-change-email").onclick = function () {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email1").value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email2").value) && document.getElementById("email1").value == document.getElementById("email2").value) {
        document.getElementById("email-error").innerText = ""
        changeemail()
    } else {
        document.getElementById("email-error").innerText = "Please a valide email 2 times"
    }
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
let ids = getCookie("id")

function changeemail() {
    fetch("/checkemail", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            id: parseInt(ids),
            email: document.getElementById("email1").value
        })
    })
        .then(async (res) => {
            if (!res.ok)
                throw await res.json()
            return res.json()
        })
        .then((data) => {
            location.href = "/profile"
        }).catch((err) => {
            document.getElementById("error").innerText = err.error
        })
}