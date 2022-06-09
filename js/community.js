document.getElementById("btn").onclick = function() {
    create()
}

function create() {
    fetch("/newcommunity", {
        method: "POST",
        headers: {
            "content-type": "application/json" 
        },
        body: JSON.stringify({
            Name: document.getElementById("titre").value,
            Desc: document.getElementById("content").value
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if (!!data.error) {
            document.getElementById("error").innerHTML = data.error
            return
        }
    })
}