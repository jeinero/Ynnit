const url = new URL(window.location.href)
let id = url.searchParams.get('id')
console.log(id)
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

const viewcommunity = document.getElementById('viewcommunity')
fetch("/apicommunauters/" + id)
        .then((response) => response.json())
        .then(data => {
                console.log(data)

                const divleft = document.createElement('div')
                divleft.classList = 'divleft'
                viewcommunity.appendChild(divleft)

                const divright = document.createElement('div')
                divright.classList = 'divright'
                viewcommunity.appendChild(divright)

                const name = document.createElement('div')
                name.classList = 'name'
                name.innerHTML = "Community"
                divleft.appendChild(name)

                const namecontent = document.createElement('div')
                namecontent.classList = 'namecontent'
                namecontent.innerHTML = data.Communauter.Name
                divleft.appendChild(namecontent)

                const date = document.createElement('div')
                date.classList = 'date'
                date.innerHTML = "Date"
                divright.appendChild(date)

                const datecontent = document.createElement('div')
                datecontent.classList = 'date'
                datecontent.innerHTML = data.Communauter.Date
                divright.appendChild(datecontent)

                const description = document.createElement('div')
                description.classList = 'description'
                description.innerHTML = "Description"
                divright.appendChild(description)

                const descriptioncontent = document.createElement('div')
                descriptioncontent.classList = 'descriptioncontent'
                descriptioncontent.innerHTML = data.Communauter.Desc
                divright.appendChild(descriptioncontent)
                })


   


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
