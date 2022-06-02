export function onClickPost() {
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
    .then((data) => {})
}
