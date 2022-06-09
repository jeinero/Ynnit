fetch("/apiposts")
    .then((response) => response.json())
    .then(function newCard(posts) {
        posts.forEach(element => {
            console.log(element.CommuLink)
            fetch("/apicommunauters/"+element.CommuLink)
            .then(resp => resp.json())
            .then(data => {
                const newcard = document.createElement('div')
            const a = document.createElement('a')
            const lien = document.createTextNode('voici le lien')
            a.append(lien)
            a.href = "/viewpost?id=" + element.Id
            newcard.append(a)
            newcard.classList = 'card'

            const divhaut = document.createElement('div')
            divhaut.classList = 'divhaut'

            const title = document.createElement('div')
            title.classList = 'title'
            title.innerHTML = element.Title

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
            divhaut.append(userpseudo)
            newcard.appendChild(divhaut)
            newcard.append(content)
            newcard.appendChild(divbas)
            divbas.append(like)
            divbas.append(dislike)
            divbas.append(comments)
            const integrate = document.querySelector('.bigcard')
            integrate.appendChild(newcard)
            } )
              });
    })