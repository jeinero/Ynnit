let post = await getApi("/apiposts")
let likeTab = undefined
let dislikeTab = undefined
let Commentpost = undefined

if (getCookie("id") != null) {
  likeTab = await getApi('/apilike/' + getCookie("id"))
  dislikeTab = await getApi('/apidislike/' + getCookie("id"))
}
// document.body.onload = function() {
//   newCard(post)
// }
async function getApi(url) {
  return fetch(url)
    .then((response) => response.json())
    .then(data => { return data })
}
window.onload = newCard(post)
function newCard(posts) {
  posts.forEach(element => {
    fetch("/apicommunauters/" + element.CommuLink)
      .then(resp => resp.json())
      .then(data => {
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

        const community = document.createElement('div')
        community.classList = 'community'
        community.innerHTML = `<a href='/viewcommunity?id=${element.CommuLink}'>${data.Communauter.Name}</a>`


        const tags = document.createElement('div')
        tags.classList = 'tags'
        console.log(element)
        tags.innerHTML = data.Communauter.Tags

        const content = document.createElement('div')
        content.classList = 'content'
        content.innerHTML = element.Content

        const divbas = document.createElement('div')
        divbas.classList = 'divbas'

        const like = document.createElement('a')
        like.classList = 'like'
        like.id = "like"
        let likeInt = element.Like
        like.onclick = function addLike(e) {
          fetch("/addLikepost", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              PostLink: parseInt(newcard.id),
              UsersId: parseInt(getCookie("id")),
            })
          })
            .catch((err) => {
              document.getElementById("error").innerText = err.error
            })
          if (dislike.style.color == "red") {
            likeInt += 1
            like.innerHTML = `${likeInt} &nbsp; <i class="fa fa-thumbs-up" aria-hidden="true"></i>`
            dislikeInt -=1

            dislike.innerHTML = ` ${dislikeInt}&nbsp; <i class="fa fa-thumbs-down" aria-hidden="true"></i>`
            
            like.style.color = "rgb(49, 172, 49)"
            dislike.style.color = "#000"
          } else {
            if (like.style.color == "rgb(49, 172, 49)") {
              like.style.color = "#000"
              likeInt -= 1
              like.innerHTML = `${likeInt} &nbsp; <i class="fa fa-thumbs-up" aria-hidden="true"></i>`


            } else {
              like.style.color = "rgb(49, 172, 49)"
              likeInt += 1
              like.innerHTML = `${likeInt} &nbsp; <i class="fa fa-thumbs-up" aria-hidden="true"></i>`

            }
          }
          event.stopPropagation(e)
        }
        like.innerHTML = `${likeInt} &nbsp; <i class="fa fa-thumbs-up" aria-hidden="true"></i>`
        if (likeTab != null) {
          likeTab.forEach(elem => {
            if (elem.PostLink == newcard.id) {
              like.style.color = "rgb(49, 172, 49)"
            }
          })
        }
        const dislike = document.createElement('a')
        let dislikeInt = element.DisLike
        dislike.classList = 'dislike'
        dislike.onclick = function addLike(e) {
          fetch("/addDislikepost", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              PostLink: parseInt(newcard.id),
              UsersId: parseInt(getCookie("id")),
            })
          })
            .catch((err) => {
              document.getElementById("error").innerText = err.error
            })
          if (like.style.color === "rgb(49, 172, 49)") {
            likeInt -= 1
            dislikeInt +=1

              like.innerHTML = `${likeInt} &nbsp; <i class="fa fa-thumbs-up" aria-hidden="true"></i>`
              dislike.innerHTML = ` ${dislikeInt}&nbsp; <i class="fa fa-thumbs-down" aria-hidden="true"></i>`

            like.style.color = "#000"
            dislike.style.color = "red"
          } else {
            if (dislike.style.color === "red") {
              dislike.style.color = "#000"
              dislikeInt -=1

              dislike.innerHTML = ` ${dislikeInt}&nbsp; <i class="fa fa-thumbs-down" aria-hidden="true"></i>`

            } else {
              dislikeInt +=1
              dislike.style.color = "red"
              dislike.innerHTML = ` ${dislikeInt}&nbsp; <i class="fa fa-thumbs-down" aria-hidden="true"></i>`

            }
          }
          event.stopPropagation(e)
        }
        if (dislikeTab != null) {
          dislikeTab.forEach(elem => {
            console.log(elem, newcard.id)
            if (elem.PostLink == newcard.id) {
              dislike.style.color = "red"
            }
          })
        }
        dislike.innerHTML = ` ${dislikeInt}&nbsp; <i class="fa fa-thumbs-down" aria-hidden="true"></i>`

        const divdropdownbutton = document.createElement('div')
        divdropdownbutton.className = 'dropdown'

        const buttondropdown = document.createElement('button')
        buttondropdown.className = 'dropbtn'
        buttondropdown.innerText = '!'
        divdropdownbutton.append(buttondropdown)

        const divbuttondropdown = document.createElement('div')
        divbuttondropdown.id = 'myDropdown'
        divbuttondropdown.className = 'dropdown-content'
        divdropdownbutton.append(divbuttondropdown)

        const firstoptionbuttondropdown = document.createElement('a')
        firstoptionbuttondropdown.innerText = "Delete post"
        divbuttondropdown.append(firstoptionbuttondropdown)

        const secondoptionbuttondropdown = document.createElement('a')
        secondoptionbuttondropdown.innerText = "Report Post"
        divbuttondropdown.append(secondoptionbuttondropdown)

        buttondropdown.onclick = function addLike(e) {
          event.stopPropagation(e)
          divbuttondropdown.classList.toggle("show");
        }

        function delpost() {
          fetch("/deletepost", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              id: parseInt(newcard.id)
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
              // document.getElementById("error").innerText = err.error
            })
        }

        firstoptionbuttondropdown.onclick = async function addLike(e) {
          event.stopPropagation(e)
          Commentpost = await getApi('/apiposts/' + parseInt(newcard.id))
          if (Commentpost.Comments != null) {
            Commentpost.Comments.forEach(element => {
              fetch("/deletecomme", {
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  id: parseInt(element.Id)
                })
              })
                .then(async (res) => {
                  if (!res.ok)
                    throw await res.json()
                  return res.json()
                })
                .then((data) => {
                }).catch((err) => {
                  // document.getElementById("error").innerText = err.error
                })
            })
            delpost()
          } else {
            delpost()
          }
        }

        secondoptionbuttondropdown.onclick = function addLike(e) {
          event.stopPropagation(e)
          fetch("/addWarnPost", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              Content: "needToAddAlgo",
              Link: parseInt(element.Id)
            })
          })
        }


        window.onclick = function (event) {
          if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
        }

        const comments = document.createElement('div')
        let textcomment = ""
        if (element.NumberComment <= 1) {
          textcomment = " comment"
        } else {
          textcomment = " comments"
        }
        comments.classList = 'comments'
        comments.innerHTML = element.NumberComment + textcomment

      

        const userpseudo = document.createElement('div')
        userpseudo.classList = 'userpseudo'
        userpseudo.innerHTML = element.UsersName

        divhaut.append(userpseudo)
        divhaut.append(title)
        divhaut.append(date)
        divbas.append(like)
        divbas.append(dislike)
        divbas.append(comments)
        divbas.append(community)
        divbas.append(tags)
        newcard.appendChild(divhaut)
        newcard.append(content)
        newcard.appendChild(divbas)
        
      
        
        if (getCookie("status") != "Users" && getCookie("id") != null) {
          divbas.append(divdropdownbutton)
        }
        const integrate = document.querySelector('.bigcard')
        integrate.appendChild(newcard)
        document.getElementById(element.Id).onclick = function () {
          location.href = "/viewpost?id=" + element.Id
        }
        //   document.getElementById("like").onclick = function() {
        //     alert("I am an alert box!");
        // } 
      })
  })
}

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

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
var aDay = 24 * 60 * 60 * 1000;




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

const sortComment = document.getElementById("filtercomment")
sortComment.onclick = function () {
  post.sort((a, b) => {
    return b.NumberComment - a.NumberComment
  })
  deleteCards()
  newCard(post)
}
const filterdate = document.getElementById("filterdate")
filterdate.onclick = function () {
  post.sort((a, b) => {
    return b.date - a.date
  })
  deleteCards()
  newCard(post)
}
const filterlike = document.getElementById("filterlike")
filterlike.onclick = function () {
  post.sort((a, b) => {
    return b.Like - a.Like
  })
  deleteCards()
  newCard(post)
}

function deleteCards() {
  const display = document.querySelectorAll('.card');
  display.forEach(heroe => {
    heroe.remove();
  });
}


const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })

})    




document.body.onload = function () {
  if (getCookie("name") != null) {
    let classComm = document.getElementsByClassName("lien")
    classComm[0].style.display = "none"
    classComm[1].style.display = "none"
  }
}
if (getCookie("name") != null) {
  let classComm = document.getElementsByClassName("lien")
  classComm[0].style.display = "none"
  classComm[1].style.display = "none"
}