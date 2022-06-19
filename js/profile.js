document.getElementById("logout").onclick = function () {
    location.href = "/logout"
}

document.getElementById("changeemail").onclick = function () {
    location.href = "/changeemail"
}

document.getElementById("changedesc").onclick = function () {
    location.href = "/changedesc"
}

document.getElementById("changepass").onclick = function () {
    location.href = "/changepass"
}

document.getElementById("delete").onclick = function () {
    location.href = "/delete"
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
let id = getCookie("id")
let statu = getCookie("status")

if (statu == "Administrators") {
    let buttonadmin = document.createElement("button")
    buttonadmin.id = "buttonadmin"
    buttonadmin.innerText = "admin"
    document.body.append(buttonadmin)
    document.getElementById("buttonadmin").onclick = function () {
        location.href = "/admin"
    }
}




const title = document.getElementById('viewtext')

const divcomment = document.getElementById("latestposts")

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



    data.Comments.forEach(element => {
        const divcom = document.createElement('div')
        divcom.id = element.Id
        divcomment.appendChild(divcom)

        const divtop = document.createElement('div')
        divtop.classList = 'divtop'
        divcom.appendChild(divtop)

        const dates = document.createElement('div')
        dates.innerHTML = timeSince(element.Date)
        dates.classList = 'date'
        divcom.appendChild(dates)

        const content = document.createElement('div')
        content.innerHTML = element.Content
        content.classList = 'content'
        divcom.appendChild(content)
    });

    const divpost = document.getElementById("lavraidvpost")


    data.Post.forEach(element => {
        const divcom = document.createElement('div')
        divcom.id = element.Id
        divpost.appendChild(divcom)

        const divtop = document.createElement('div')
        divtop.classList = 'divtop'
        divcom.appendChild(divtop)

        const dates = document.createElement('div')
        dates.innerHTML = timeSince(element.Date)
        dates.classList = 'date'
        divcom.appendChild(dates)

        const title = document.createElement('div')
        title.innerHTML = element.Title
        title.classList = 'title'
        divcom.appendChild(title)

        const content = document.createElement('div')
        content.innerHTML = element.Content
        content.classList = 'content'
        divcom.appendChild(content)
    });
}

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}


fetch("/apiusers/" + id)
    .then(resp => resp.json())
    .then(loadDataUser)