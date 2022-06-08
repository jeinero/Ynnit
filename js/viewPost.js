const url = new URL(window.location.href)
const id = url.searchParams.get('id')
// console.log(id)
const viewpost = document.getElementById('viewpost')
fetch("/apiposts/"+id)
.then((response) => response.json())
.then(data => {
       console.log(data)

        const title = document.createElement('div')
        title.innerHTML = data.Post.Title
        title.classList = 'title'
        viewpost.appendChild(title)

        const content = document.createElement('div')
        content.innerHTML = data.Post.Content
        content.classList = 'content'
        viewpost.appendChild(content)

       
})

