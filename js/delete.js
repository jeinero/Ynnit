document.getElementById("No").onclick = function () {
    location.href = "/profile"
};

document.getElementById("Yes").onclick = function () {
    del()
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
let names = getCookie("name")


function del() {
    fetch("/checkdelete", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            id: parseInt(ids),
            name: names
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
            // document.getElementById("error").innerText = err.error
        })
}
