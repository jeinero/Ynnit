
var currentDate = new Date(),
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear();
const dates = (year + "-" + day + "-" + month)

document.getElementById("btn").onclick = function () {
    if (getCookie("name") != null) {
       
let linkCat = ""


        document.getElementById("btn").onclick = function () {
            if (getCookie("name") != null && document.getElementById("titre").value.length >= 1 && linkCat != "") {
                create()
            } else {
                document.getElementById("error").innerText = "Need a user, login or fuck off"
            }
        }


document.getElementById("btn").onclick = function () {
    if (getCookie("name") != null && document.getElementById("titre").value.length >= 1 && linkCat != "") {
        create()
    } else {
        document.getElementById("error").innerText = "Need a user, login or fuck off"
    }
}

        function create() {
            fetch("/newcommunity", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("titre").value,
                    desc: document.getElementById("content").value,
                    date: dates,
                    Tags: linkCat,
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

function create() {
    fetch("/newcommunity", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            Name: document.getElementById("titre").value,
            Desc: document.getElementById("content").value,
            Tags: linkCat
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



        const select = document.getElementById('select')
        select.addEventListener('change', function handleChange(event) {
            linkCat = event.target.value
        })
    }
}

