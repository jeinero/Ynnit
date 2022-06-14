document.getElementById("logout").onclick = function(){
    location.href = "/logout"
}
document.getElementById("home").onclick = function(){
    location.href = "/"
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


const loadDataUser = data => {
    let name = document.createElement("h1")
    name.innerText = data.User.Name
    document.body.append(name)

    let email = document.createElement("h1")
    email.innerText = data.User.Email
    document.body.append(email)

    let desc = document.createElement("h1")
    desc.innerText = data.User.Desc
    document.body.append(desc)

    let rank = document.createElement("h1")
    rank.innerText = data.User.UsersLevel
    document.body.append(rank)

    let creationdate = document.createElement("h1")
    creationdate.innerText = data.User.Date
    document.body.append(creationdate)
}

 fetch("/apiusers/" + id)
.then(resp => resp.json())
.then(loadDataUser)