const url = new URL(window.location.href)
let id = url.searchParams.get('id')
document.getElementById("btn").onclick = function () {

        onClickComment()
        location.reload().href = "/viewpost?id=" + element.Id

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

function onClickComment() {
        fetch("/comment", {
                method: "POST",
                headers: {
                        "content-type": "application/json"
                },
                body: JSON.stringify({
                        UsersName: getCookie("name"),
                        postLink : parseInt(id),
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
                        const divtop = document.createElement('div')
                        divtop.classList = 'divtop'
                        viewcommentaire.appendChild(divtop)

                        const content = document.createElement('div')
                        content.innerHTML = element.Content
                        content.classList = 'content'
                        viewcommentaire.appendChild(content)

                        const username = document.createElement('div')
                        username.innerHTML = "by&ensp;" + element.UsersName
                        username.classList = 'username'
                        viewcommentaire.appendChild(username)

                })


        })









