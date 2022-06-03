document.getElementById("btn").onclick = function(){
    if (document.getElementById("titre").value.length >=1)  {
        onClickPost()
    } else {
        document.getElementById("error").innerText = "enter a valide email and name and a password of at least 8 characters"
    }
};


 function onClickPost() {
    fetch("/post", {
        method : "POST",
        headers :{
            "content-type" : "application/json"
        },
        body: JSON.stringify({
            title: document.getElementById("titre").value,
            content: document.getElementById("content").value,
        })
    })
    .then((resp) => resp.json())
    .then((data) => {
        if (!!data.error) {
            document.getElementById("error").innerText = data.error
            return;
    }
        
    })
}
