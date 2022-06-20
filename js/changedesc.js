document.getElementById("submit-change-desc").onclick = function () {
    if (document.getElementById("desc").value.length >= 1) {
        document.getElementById("desc-error").innerText = ""
        changedesc()
    } else {
        document.getElementById("desc-error").innerText = "Please enter a valide description"
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

function changedesc() {
    fetch("/checkdesc", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            id: parseInt(ids),
            desc: document.getElementById("desc").value
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