fetch("/apiposts")
    .then((response) => response.json())
    .then(function newCard(posts) {
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


            const userpseudo = document.createElement('div')

            userpseudo.classList = 'userpseudo'
            userpseudo.innerHTML = element.UsersName

            const content = document.createElement('div')
            content.classList = 'content'
            content.innerHTML = element.Content

            const divbas = document.createElement('div')
            divbas.classList = 'divbas'

            const like = document.createElement('div')
            like.classList = 'like'
            like.innerHTML = "L"

            const dislike = document.createElement('div')
            dislike.classList = 'dislike'
            dislike.innerHTML = "D"

            const comments = document.createElement('div')
            comments.classList = 'comments'
            comments.innerHTML = "Commentaires"

            divhaut.append(title)
            divhaut.append(community)
            divhaut.append(date)
            // divhaut.append(userpseudo)
            newcard.appendChild(divhaut)
            newcard.append(content)
            newcard.appendChild(divbas)
            divbas.append(like)
            divbas.append(dislike)
            divbas.append(comments)
            const integrate = document.querySelector('.bigcard')
            integrate.appendChild(newcard)
            document.getElementById(element.Id).onclick = function() {
              location.href = "/viewpost?id=" + element.Id
          } 
          } )
        });
      })
      


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

      document.body.onload = function() {
        if (getCookie("name") != null) {
                let classComm = document.getElementsByClassName("lien")
                classComm[0].style.display = "none"
                classComm[1].style.display = "none"
                }
 }
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
