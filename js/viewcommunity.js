const url = new URL(window.location.href)
let id = url.searchParams.get('id')


function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
document.body.onload = function () {
    if (getCookie("name") === null) {
            let classComm = document.getElementsByClassName("commentaire")[0]
            classComm.style.display = "none"
    }
}
var currentDate = new Date()
let dates = currentDate.getTime()

const flextitle = document.getElementById("flex-title")
const littlecolumn = document.getElementById("little-column")
fetch("/apicommunauters/" + id )
    .then((response) => response.json())
    .then(data => {
        console.log(data)
        const title = document.createElement('div')
        title.innerHTML = data.Communauter.Name
        flextitle.appendChild(title)

        const Desc = document.createElement('div')
        Desc.innerHTML = data.Communauter.Desc
        littlecolumn.appendChild(Desc)
    

    })