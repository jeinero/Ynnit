let linkCommu = 0
let dates = ""
document.getElementById("btn").onclick = function () {
    if (document.getElementById("titre").value.length >= 1) {
        if (getCookie("name") != null) {
            if (linkCommu != 0) {
                onClickPost()
            } else {
                document.getElementById("error").innerText = "choose a community"
            }
        } else {
            document.getElementById("error").innerText = "Need a user, login or fuck off"
        }
    } else {
        document.getElementById("error").innerText = "enter a title"
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
const selector = document.getElementsByClassName("selectcomm")[0]
function onClickPost() {
    fetch("/post", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            date: dates,
            commuLink: parseInt(linkCommu),
            usersname: getCookie("name"),
            title: document.getElementById("titre").value,
            content: document.getElementById("content").value
        })
    })
        .catch((err) => {
            document.getElementById("error").innerText = err.error

        })
        .then(data => {
            window.location.assign("/");
        })
}

fetch("/apicommunauters")
    .then(resp => resp.json())
    .then(data => {
        let selector = document.getElementsByClassName("selectcomm")[0]
        data.forEach(elemnt => {
            let options = document.createElement("option")
            options.text = elemnt.Name
            options.value = elemnt.Id
            selector.appendChild(options)
        })
    })
const select = document.getElementById('select');
select.addEventListener('change', function handleChange(event) {
    linkCommu = event.target.value
});

var currentDate = new Date()
dates = currentDate.getTime()


document.body.onload = function () {
    if (getCookie("name") != null) {
        let classComm = document.getElementsByClassName("lien")
        classComm[0].style.display = "none"
        classComm[1].style.display = "none"
    }
}