document.getElementById("logout").onclick = function(){
    location.href = "/logout"
}

document.getElementById("home").onclick = function(){
    location.href = "/"
}

document.getElementById("admin").onclick = function(){
  location.href = "/admin"
}

// document.getElementById("delete").onclick = function(){
//     location.href = "/delete"
// }


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



const viewtext = document.getElementById('viewtext')
const title = document.getElementById('tiletext')

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

    const titlename = document.createElement("div")
    title.classList = "titlename"
    titlename.innerText = data.User.Name
    title.append(titlename)



}


fetch("/apiusers/" + id)
.then(resp => resp.json())
.then(loadDataUser)


const modal = document.getElementById("modal-changedesc");
const btn = document.getElementById("changedesc");
const span = document.getElementById("close-changedesc");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const modalPass = document.getElementById("modal-changepass");
const btnPass = document.getElementById("changepass");
const spanPass = document.getElementById("close-pass");

btnPass.onclick = function() {
  modalPass.style.display = "block";
}

spanPass.onclick = function() {
  modalPass.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalPass) {
    modalPass.style.display = "none";
  }
}


const modalEmail = document.getElementById("modal-email");
const btnEmail = document.getElementById("changeemail");
const spanEmail = document.getElementById("close-email");

btnEmail.onclick = function() {
  modalEmail.style.display = "block";
}

spanEmail.onclick = function() {
  modalEmail.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalEmail) {
    modalEmail.style.display = "none";
  }
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

// window.onclick = function(event) {
//   if (event.target == modalPicture) {
//     modalPicture.style.display = "none";
//   }
// }

const modalDelte = document.getElementById("modal-delete");
const btnDelete = document.getElementById("deleteaccount");
const spanDelete = document.getElementById("close-delete");

btnDelete.onclick = function() {
  modalDelte.style.display = "block";
}

spanDelete.onclick = function() {
  modalDelte.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalDelte) {
    modalDelte.style.display = "none";
  }
}