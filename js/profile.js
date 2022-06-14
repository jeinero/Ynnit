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
const title = document.getElementById('viewtext')

const loadDataUser = data => {
    
    const name = document.createElement("p")
    name.innerText = data.User.Name
    title.appendChild(name)

    let email = document.createElement("p")
    email.innerText = data.User.Email
    title.append(email)

    let desc = document.createElement("p")
    desc.innerText = data.User.Desc
    title.append(desc)

    let rank = document.createElement("p")
    rank.innerText = data.User.UsersLevel
    title.append(rank)

}


 fetch("/apiusers/" + id)
.then(resp => resp.json())
.then(loadDataUser)