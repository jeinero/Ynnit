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

            const content = document.createElement('div')
            content.classList = 'content'
            content.innerHTML = element.Content

            const divbas = document.createElement('div')
            divbas.classList = 'divbas'

            const like = document.createElement('button')
            like.classList = 'like'
            like.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`

            const dislike = document.createElement('button')
            dislike.classList = 'dislike'
            dislike.innerHTML = `<i class="fa fa-thumbs-down" aria-hidden="true"></i>`

            const comments = document.createElement('div')
            comments.classList = 'comments'
            comments.innerHTML = "Commentaires"

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
          } )
        });
      })
      


    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        console.log(seconds)
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
        console.log(interval)
        return Math.floor(seconds) + " seconds";
      }
      var aDay = 24*60*60*1000;

      const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })

})

