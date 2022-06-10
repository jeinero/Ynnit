document.getElementById("btn").onclick = function() {
    if (getCookie("name") != null ){
        create()
    } else {
        document.getElementById("error").innerText = "Need a user, login or fuck off"
    }
}

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

function create() {
    fetch("/newcommunity", {
        method: "POST",
        headers: {
            "content-type": "application/json" 
        },
        body: JSON.stringify({
            Name: document.getElementById("titre").value,
            Desc: document.getElementById("content").value
        })
    })
    .then(async (res) => {
        if (!res.ok)
            throw await res.json()
       return res.json()
    })
    .then((data) => {
        location.href = "/"
    }).catch((err) => {
        document.getElementById("error").innerText = err.error
    })
}