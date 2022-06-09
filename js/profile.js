document.getElementById("logout").onclick = function(){
    location.href = "/logout"
}


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
let id = getCookie("id")

 fetch("/apiusers/" + id)
.then(resp => resp.json())
.then(data => {
    let name = document.createElement("h1")
    name.innerText = data.User.Name
    document.body.append(name)
})
