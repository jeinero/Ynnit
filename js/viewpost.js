let likeTab = undefined
let dislikeTab = undefined

if (getCookie("id") != null) {
    likeTab = await getApi('/apilikecomment/' + getCookie("id"))
    dislikeTab = await getApi('/apidislikecomment/' + getCookie("id"))
}

async function getApi(url) {
    return fetch(url)
        .then((response) => response.json())
        .then(data => { return data })
}

const url = new URL(window.location.href)
let id = url.searchParams.get('id')
document.getElementById("btn2").onclick = function () {

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
        username.innerHTML = "Posted by&ensp;" + data.Post.UsersName
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

        data.Comments.forEach(element => {
            const divcom = document.createElement('div')
            divcom.id = element.Id
            divcom.className = "comm"
            viewcommentaire.appendChild(divcom)
            const post = document.createElement('div')
            post.classList = 'post'
            viewpost.appendChild(post)

            const divtop2 = document.createElement('div')
            divtop2.classList = 'divtop2'
            post.appendChild(divtop2)

            const username = document.createElement('div')
            username.innerHTML = "Posted by&ensp;" + element.UsersName
            username.classList = 'username'
            divtop2.appendChild(username)

            const dates = document.createElement('div')
            dates.innerHTML = timeSince(element.Date)
            dates.classList = 'date'
            divtop2.appendChild(dates)

            const content = document.createElement('div')
            content.innerHTML = element.Content
            content.classList = 'contents'
            post.appendChild(content)

            const divbottom2 = document.createElement('div')
            divbottom2.classList = 'divbottom2'
            post.appendChild(divbottom2)

            const like = document.createElement('button')
            like.classList = 'like'
            like.id = "like"
            divbottom2.appendChild(like)

            like.onclick = function addLike(e) {
                console.log(element.Id)
                fetch("/addLikecomment", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        CommentLink: parseInt(element.Id),
                        UsersId: parseInt(getCookie("id")),
                    })
                })
                    .catch((err) => {
                        document.getElementById("error").innerText = err.error
                    })
                if (dislike.style.color == "red") {
                    like.style.color = "rgb(49, 172, 49)"
                    dislike.style.color = "#000"
                } else {
                    if (like.style.color == "rgb(49, 172, 49)") {
                        like.style.color = "#000"
                    } else {
                        like.style.color = "rgb(49, 172, 49)"
                    }
                }
                event.stopPropagation(e)
            }
            like.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`
            if (likeTab != null) {
                likeTab.forEach(elem => {
                    console.log("lol")
                        console.log(elem.CommentLink, parseInt(divbottom2.id))
                    if (element.Id === elem.CommentLink) {
                        like.style.color = "rgb(49, 172, 49)"
                    }
                })
            }

            const dislike = document.createElement('button')
            dislike.classList = 'dislike'
            dislike.id = "dislike"
            divbottom2.appendChild(dislike)
            dislike.onclick = function addLike(e) {
                fetch("/addDislikecomment", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        CommentLink: parseInt(element.Id),
                        UsersId: parseInt(getCookie("id")),
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
            if (dislikeTab != null) {
                dislikeTab.forEach(elem => {
                    console.log("lol")
                    if (elem.CommentLink == element.Id) {
                        dislike.style.color = "red"
                    }
                })
            }
            dislike.innerHTML = `<i class="fa fa-thumbs-down" aria-hidden="true"></i>`

           


            // const divbuttondropdown = document.createElement('div')
            // divbuttondropdown.id = 'myDropdown'
            // divbuttondropdown.className = 'dropdown-content'
            // divdropdownbutton.append(divbuttondropdown)

            // const firstoptionbuttondropdown = document.createElement('a')
            // firstoptionbuttondropdown.innerText = "Delete comm"
            // divbuttondropdown.append(firstoptionbuttondropdown)

            // const secondoptionbuttondropdown = document.createElement('a')
            // secondoptionbuttondropdown.innerText = "Report User"
            // divbuttondropdown.append(secondoptionbuttondropdown)

            // buttondropdown.onclick = function addLike(e) {
            //     event.stopPropagation(e)
            //     divbuttondropdown.classList.toggle("show");
            // }

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

            // firstoptionbuttondropdown.onclick = async function addLike(e) {
            //     event.stopPropagation(e)
            //     let idcom = divcom.id
            //     fetch("/deletecomme", {
            //         method: "POST",
            //         headers: {
            //             "content-type": "application/json"
            //         },
            //         body: JSON.stringify({
            //             id: parseInt(idcom)
            //         })
            //     })
            //         .then(async (res) => {
            //             if (!res.ok)
            //                 throw await res.json()
            //             return res.json()
            //         })
            //         .then((data) => {
            //             location.href = "/viewpost?id="+id
            //         }).catch((err) => {
            //             // document.getElementById("error").innerText = err.error
            //         })
            // }

            // secondoptionbuttondropdown.onclick = function addLike(e) {
            //     event.stopPropagation(e)
            // }
           



        })

            if (getCookie("status") != "Users" && getCookie("id") != null) {
                divcom.append(divdropdownbutton)
            }

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
      if (getCookie("name") != null) {
        let classComm = document.getElementsByClassName("lien")
        classComm[0].style.display = "none"
        classComm[1].style.display = "none"
      }


const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })

})




const modal = document.getElementById("myModal");


const btnpop = document.getElementById("myBtn");


const span = document.getElementsByClassName("close")[0];


btnpop.onclick = function () {
    modal.style.display = "block";
}


span.onclick = function () {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}