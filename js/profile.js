// document.getElementById("logout").onclick = function () {
//     location.href = "/logout"
// }

// document.getElementById("home").onclick = function(){
//     location.href = "/"
// }

// document.getElementById("admin").onclick = function(){
//   location.href = "/admin"
// }

// document.getElementById("delete").onclick = function(){
//     location.href = "/delete"
// }


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
    // let buttonadmin = document.createElement("button")
    // buttonadmin.id = "buttonadmin"
    // buttonadmin.innerText = "admin"
    // document.body.append(buttonadmin)
    // document.getElementById("buttonadmin").onclick = function () {
    //     location.href = "/admin"
    // }
    console.log("je suis admin!")
    const adminbutton = document.getElementById("adminbutton")
    adminbutton.style.display = "flex"
    
} else {
  adminbutton.style.display = "none"

}




const viewtext = document.getElementById('viewtext')
const title = document.getElementById('titletext')

const divcomment = document.getElementById("latestcomments")
const divpost = document.getElementById("latestposts")

const loadDataUser = data => {
    
    const name = document.createElement("div")
    name.innerText = data.User.Name
    viewtext.appendChild(name)

    let email = document.createElement("div")
    email.innerText = data.User.Email
    viewtext.append(email)

    let desc = document.createElement("div")
    desc.classList = "desc"
    desc.innerText = data.User.Desc
    viewtext.append(desc)

    let rank = document.createElement("div")
    rank.innerText = data.User.UsersLevel
    viewtext.append(rank)

    // const titlename = document.createElement("div")
    // title.classList = "titlename"
    // titlename.innerText = data.User.Name
    // title.append(titlename)





    data.Comments.forEach(element => {
        const titleofpost = document.createElement('div')

        fetch("/apiposts/"+element.Id)
        .then(resp => resp.json())
        .then(datapost => {
          titleofpost.classList = 'title'
          titleofpost.innerHTML = 'On post "'+datapost.Post.Title+'"'
        })

        const newcard = document.createElement('div')
        newcard.id = element.Id
        newcard.classList = "card"
        // newcard.href = "/viewpost?id="+element.Id

        const divhaut = document.createElement('div')
        divhaut.classList = 'divhaut'

        // const title = document.createElement('div')
        // title.classList = 'title'
        // title.innerHTML = "On post "+TitlePost+'"'

        const date = document.createElement('div')
        date.classList = 'date'
        date.innerHTML = timeSince(element.Date)

        const content = document.createElement('div')
        content.classList = 'content'
        content.innerHTML = element.Content

        
        

        // divhaut.append(title)
        divhaut.append(titleofpost)

        divhaut.append(date)
        newcard.appendChild(divhaut)
        newcard.append(content)

        const integrate = document.querySelector('.bigcardcomments')
        integrate.appendChild(newcard)
      
        // document.getElementById(element.Id).onclick = function () {
        //   location.href = "/viewpost?id=" + element.Id
        // }
        
    });



    data.Post.forEach(element => {
        const newcard = document.createElement('div')
        newcard.id = element.Id
        newcard.classList = "card"

        const divhaut = document.createElement('div')
        divhaut.classList = 'divhaut'

        const title = document.createElement('div')
        title.classList = 'title'
        title.innerHTML = element.Title

        const date = document.createElement('div')
        date.classList = 'date'
        date.innerHTML = timeSince(element.Date)

        const content = document.createElement('div')
        content.classList = 'content'
        content.innerHTML = element.Content

        const divbas = document.createElement('div')
        divbas.classList = 'divbas'

        const comments = document.createElement('div')
        let textcomment = ""
        if (element.NumberComment<=1) {
          textcomment = " comment"
        } else {
          textcomment = " comments"
        }
        comments.classList = 'comments'
        comments.innerHTML = element.NumberComment + textcomment
        

        divhaut.append(title)
        divhaut.append(date)
        newcard.appendChild(divhaut)
        newcard.append(content)
        newcard.appendChild(divbas)
        divbas.append(comments)

        const integrate = document.querySelector('.bigcard')
        integrate.appendChild(newcard)
        
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



// MODALS:

const modal = document.getElementById("modal-changedesc");
const bigcard = document.getElementById("comments")
const bigcard2 = document.getElementById("posts")

const btn = document.getElementById("changedesc");
const span = document.getElementById("close-changedesc");

btn.onclick = function() {
  modal.style.display = "block";
  bigcard.style.display = "none";
  bigcard2.style.display = "none";
}

span.onclick = function() {
  modal.style.display = "none";
  bigcard.style.display = "flex";
  bigcard2.style.display = "flex";
}



const modalPass = document.getElementById("modal-changepass");
const btnPass = document.getElementById("changepass");
const spanPass = document.getElementById("close-pass");

btnPass.onclick = function() {
  modalPass.style.display = "block";
  bigcard.style.display = "none";
  bigcard2.style.display = "none";
}

spanPass.onclick = function() {
  modalPass.style.display = "none";
  bigcard.style.display = "flex";
  bigcard2.style.display = "flex";
}



const modalEmail = document.getElementById("modal-email");
const btnEmail = document.getElementById("changeemail");
const spanEmail = document.getElementById("close-email");

btnEmail.onclick = function() {
  modalEmail.style.display = "block";
  bigcard.style.display = "none";
  bigcard2.style.display = "none";
}

spanEmail.onclick = function() {
  modalEmail.style.display = "none";
  bigcard.style.display = "flex";
  bigcard2.style.display = "flex";
}



// const modalPicture = document.getElementById("modal-picture");
// const btnPicture = document.getElementById("changepicture");
// const spanPicture = document.getElementById("close-picture");

// btnPicture.onclick = function() {
//   modalPicture.style.display = "block";
// }

// spanPicture.onclick = function() {
//   modalPicture.style.display = "none";
// }



const modalDelte = document.getElementById("modal-delete");
const btnDelete = document.getElementById("deleteaccount");
const spanDelete = document.getElementById("close-delete");

btnDelete.onclick = function() {
  modalDelte.style.display = "block";
  bigcard.style.display = "none";
  bigcard2.style.display = "none";
}

spanDelete.onclick = function() {
  modalDelte.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalDelte) {
    modalDelte.style.display = "none";
  }
  bigcard.style.display = "flex";
  bigcard2.style.display = "flex";
}