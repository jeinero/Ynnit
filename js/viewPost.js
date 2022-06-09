const url = new URL(window.location.href)
const id = url.searchParams.get('id')
document.getElementById("btn").onclick = function () {

        onClickComment()
        location.href = "/viewpost?id=" + element.Id
        
}

function onClickComment() {
        fetch("/comment", {
                method: "POST",
                headers: {
                        "content-type": "application/json"
                },
                body: JSON.stringify({
                        content: document.getElementById("content").value,
                })
        })
                .catch((err) => {
                        document.getElementById("error").innerText = err.error
                })
      
}

const viewpost = document.getElementById('viewpost')
const viewcommentaire = document.getElementById('viewcommentaire')
fetch("/apiposts/" + id)
        .then((response) => response.json())
        .then(data => {

                const divtop = document.createElement('div')
                divtop.classList = 'divtop'
                viewpost.appendChild(divtop)

                const title = document.createElement('div')
                title.innerHTML = data.Post.Title
                title.classList = 'title'
                divtop.appendChild(title)

                const username = document.createElement('div')
                username.innerHTML = "by&ensp;" + data.Post.UsersName
                username.classList = 'username'
                divtop.appendChild(username)

                const content = document.createElement('div')
                content.innerHTML = data.Post.Content
                content.classList = 'content'
                viewpost.appendChild(content)

                data.Comments.forEach(element => {
                        console.log(element)
                        const divtop = document.createElement('div')
                        divtop.classList = 'divtop'
                        viewcommentaire.appendChild(divtop)

                        const content = document.createElement('div')
                        content.innerHTML = element.Content
                        content.classList = 'content'
                        viewcommentaire.appendChild(content)
                })


        })

      
               

     






