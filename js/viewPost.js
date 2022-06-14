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
document.body.onload = function() {
       if (getCookie("name") === null) {
               let classComm = document.getElementsByClassName("commentaire")[0]
               classComm.style.display = "none"
               }
}
var currentDate = new Date()
let dates = currentDate.getTime()

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
                        Date:  dates
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

                const date = document.createElement('div')
                console.log(data.Post.Date)
                date.innerHTML = timeSince(data.Post.Date)
                date.classList = 'date'
                divtop.appendChild(date)

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

                        const dates = document.createElement('div')
                        dates.innerHTML = timeSince(element.Date)
                        dates.classList = 'date'
                        viewcommentaire.appendChild(dates)

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
                console.log(interval)
                return Math.floor(seconds) + " seconds";
              }
              var aDay = 24*60*60*1000;









