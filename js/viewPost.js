const url = new URL(window.location.href)
const id = url.searchParams.get('id')
const viewpost = document.getElementById('viewpost')
fetch("/apiposts/"+id)
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

      

})

