document.getElementById("logout").onclick = function(){
    location.href = "/logout"
}

document.getElementById("changeemail").onclick = function(){
    location.href = "/changeemail"
}

document.getElementById("changedesc").onclick = function(){
    location.href = "/changedesc"
}

document.getElementById("changepass").onclick = function(){
    location.href = "/changepass"
}

document.getElementById("delete").onclick = function(){
    location.href = "/delete"
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
let id = getCookie("id")
let statu = getCookie("status")

if (statu == "Administrators") {
    let buttonadmin = document.createElement("button")
    buttonadmin.id = "buttonadmin"
    buttonadmin.innerText = "admin"
    document.body.append(buttonadmin)
    document.getElementById("buttonadmin").onclick = function(){
        location.href = "/admin"
    }
}




const title = document.getElementById('viewtext')

const loadDataUser = data => {
    
    const name = document.createElement("div")
    name.innerText = data.User.Name
    title.appendChild(name)

    let email = document.createElement("div")
    email.innerText = data.User.Email
    title.append(email)

    let desc = document.createElement("div")
    desc.classList = "desc"
    desc.innerText = data.User.Desc
    title.append(desc)

    let rank = document.createElement("div")
    rank.innerText = data.User.UsersLevel
    document.body.append(rank)

    let creationdate = document.createElement("h1")
    creationdate.innerText = data.User.Date
    document.body.append(creationdate)
    title.append(rank)

}


fetch("/apiusers/" + id)
.then(resp => resp.json())
.then(loadDataUser)