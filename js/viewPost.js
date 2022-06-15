const url = new URL(window.location.href)
let id = url.searchParams.get('id')
document.getElementById("btn").onclick = function () {

        onClickComment()
        location.reload().href = "/viewpost?id=" + element.Id

}

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
document.body.onload = function () {
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
                        postLink: parseInt(id),
                        content: document.getElementById("content").value,
                        Date: dates
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
                
                const username = document.createElement('div')
                username.innerHTML = "by&ensp;" + data.Post.UsersName
                username.classList = 'username'
                divtop.appendChild(username)

                const date = document.createElement('div')
                date.innerHTML = timeSince(data.Post.Date)
                date.classList = 'date'
                divtop.appendChild(date)

                

                const divmiddle = document.createElement('div')
                divmiddle.classList = 'divmiddle'
                viewpost.appendChild(divmiddle)
                
                const title = document.createElement('div')
                title.innerHTML = data.Post.Title
                title.classList = 'title'
                divmiddle.appendChild(title)


                const content = document.createElement('div')
                content.innerHTML = data.Post.Content
                content.classList = 'content'
                viewpost.appendChild(content)

                const divbottom = document.createElement('div')
                divbottom.classList = 'divbottom'
                viewpost.appendChild(divbottom)

               
            const like = document.createElement('button')
            like.classList = 'like'
            like.id = "like"
            like.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`
            divbottom.appendChild(like)

            const dislike = document.createElement('button')
            dislike.classList = 'dislike'
            dislike.innerHTML = `<i class="fa fa-thumbs-down" aria-hidden="true"></i>`
            divbottom.appendChild(dislike)

                data.Comments.forEach(element => {
                        const post = document.createElement('div')
                        post.classList = 'post'
                        viewpost.appendChild(post)

                        const divtop2 = document.createElement('div')
                        divtop2.classList = 'divtop2'
                        post.appendChild(divtop2)
                        
                        const username = document.createElement('div')
                        username.innerHTML = "by&ensp;" + element.UsersName
                        username.classList = 'username'
                        divtop2.appendChild(username)

                        const dates = document.createElement('div')
                        dates.innerHTML = timeSince(element.Date)
                        dates.classList = 'date'
                        divtop2.appendChild(dates)




                        // const divcontent = document.createElement('div')
                        // divcontent.classList = 'divcontent'
                        // post.appendChild(divcontent)




                        const content = document.createElement('div')
                        content.innerHTML = element.Content
                        content.classList = 'contents'
                        post.appendChild(content)



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
var aDay = 24 * 60 * 60 * 1000;




document.body.onload = function () {
        if (getCookie("name") != null) {
                let classComm = document.getElementsByClassName("lien")
                classComm[0].style.display = "none"
                classComm[1].style.display = "none"
        }
}






const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })

})
