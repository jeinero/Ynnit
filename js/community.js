let linkCat = ""


var currentDate = new Date(),
day = currentDate.getDate(),
month = currentDate.getMonth() + 1,
year = currentDate.getFullYear();
const dates = ( year + "-" + day + "-" + month)


document.getElementById("btn").onclick = function () {
    if (getCookie("name") != null && document.getElementById("titre").value.length >= 1 && linkCat != "") {
        create()
    } else {
        document.getElementById("error").innerText = "Need a user, login or fuck off"
    }
}

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

function create() {
    fetch("/newcommunity", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            Name: document.getElementById("titre").value,
            Desc: document.getElementById("content").value,
            Tags: linkCat,
            date: dates
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

document.body.onload = function () {
    if (getCookie("name") != null) {
        let classComm = document.getElementsByClassName("lien")
        classComm[0].style.display = "none"
        classComm[1].style.display = "none"
    }
}

const selector = document.getElementsByClassName("selectcat")[0]

fetch("/apicategories")
    .then(resp => resp.json())
    .then(data => {
        let selector = document.getElementsByClassName("selectcat")[0]
        data.forEach(elemnt => {
            let options = document.createElement("option")
            options.text = elemnt.Name
            options.value = elemnt.Name
            selector.appendChild(options)
        })
    })
const select = document.getElementById('select');
select.addEventListener('change', function handleChange(event) {
    linkCat = event.target.value
});