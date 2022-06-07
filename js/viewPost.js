const url = new URL(window.location.href)
const id = url.searchParams.get('id')
// console.log(id)
const test = document.getElementById('test')
fetch("/apiposts/"+id)
.then((response) => response.json())
.then(function viewPost(post) {
    post.forEach(element => {
        const viewPost = document.createElement('div')
        viewPost.classList = 'viewPost'
        viewPost.innerHTML = element.Title
        test.appendChild(viewPost)

    })
})

