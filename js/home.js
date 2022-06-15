let post = await getApi("/apiposts")
var user = undefined
if (getCookie("id") != null) {
 user = await getApi('/apilike/' + getCookie("id"))
}
console.log(user)
// document.body.onload = function() {
//   newCard(post)
//   console.log("witf")
// }
async function getApi(url) {
  return fetch(url)
  .then((response) => response.json())
  .then(data => {return data})
}
window.onload = newCard(post) 
console.log(post)
function newCard(posts) {
  posts.forEach(element => {
      console.log(element.CommuLink)
      fetch("/apicommunauters/"+element.CommuLink)
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
      community.innerHTML = data.Communauter.Name

      const content = document.createElement('div')
      content.classList = 'content'
      content.innerHTML = element.Content

      const divbas = document.createElement('div')
      divbas.classList = 'divbas'

      const like = document.createElement('button')
      like.classList = 'like'
      like.id = "like"
      like.onclick = function addLike(e) {
        fetch("/addLike", {
          method: "POST",
          headers: {
                  "content-type": "application/json"
          },
          body: JSON.stringify({
                  PostLink : parseInt(newcard.id),
                  UsersId:  parseInt(getCookie("id")),
          })
  })
          .catch((err) => {
                  document.getElementById("error").innerText = err.error
          })
          if (dislike.style.color == "red") {
            console.log("1")
            like.style.color = "rgb(49, 172, 49)"
            dislike.style.color = "#000"
          } else {
            if (like.style.color == "rgb(49, 172, 49)") {
              like.style.color = "#000"
            } else {
              console.log("3")
              like.style.color = "rgb(49, 172, 49)"
              console.log(like.style.color)
            }
          }
          event.stopPropagation(e)
  }
      like.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`
      if (user != null) {
      user.forEach(elem => {
        if (elem.PostLink == newcard.id) {
          like.style.color = "rgb(49, 172, 49)"
        }
      })
    }
      const dislike = document.createElement('button')
      dislike.classList = 'dislike'
      dislike.onclick = function addLike(e) {
        fetch("/addDislike", {
          method: "POST",
          headers: {
                  "content-type": "application/json"
          },
          body: JSON.stringify({
                  PostLink : parseInt(newcard.id),
                  UsersId:  parseInt(getCookie("id")),
          })
  })
          .catch((err) => {
                  document.getElementById("error").innerText = err.error
          })
          if (like.style.color === "rgb(49, 172, 49)") {
            like.style.color = "#000"
            dislike.style.color = "red"
          } else {
            if (dislike.style.color === "red") {
              dislike.style.color = "#000"
            } else {
              dislike.style.color = "red"
            }
          }
          event.stopPropagation(e)
  }
      dislike.innerHTML = `<i class="fa fa-thumbs-down" aria-hidden="true"></i>`

      const comments = document.createElement('div')
      comments.classList = 'comments'
      comments.innerHTML = element.NumberComment + " commentaires"

      const userpseudo = document.createElement('div')
      userpseudo.classList = 'userpseudo'
      userpseudo.innerHTML = element.UsersName

      divhaut.append(title)
      divhaut.append(community)
      divhaut.append(date)
      newcard.appendChild(divhaut)
      newcard.append(content)
      newcard.appendChild(divbas)
      divbas.append(like)
      divbas.append(dislike)
      divbas.append(comments)
      divbas.append(userpseudo)
      const integrate = document.querySelector('.bigcard')
      integrate.appendChild(newcard)
      document.getElementById(element.Id).onclick = function() {
        location.href = "/viewpost?id=" + element.Id
    } 
  //   document.getElementById("like").onclick = function() {
  //     alert("I am an alert box!");
  // } 
    } )
})
}
    function timeSince(date) {
        let  seconds = Math.floor((new Date() - date) / 1000);
        console.log(seconds)
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
        console.log(interval)
        return Math.floor(seconds) + " seconds";
      }
      var aDay = 24*60*60*1000;




 function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })

})




// document.body.onload = function() {
//   if (getCookie("name") != null) {
//           let classComm = document.getElementsByClassName("lien")
//           classComm[0].style.display = "none"
//           classComm[1].style.display = "none"
//           }
// }
