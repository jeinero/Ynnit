document.getElementById("btn").onclick = function () {
    if (document.getElementById("titre").value.length >= 1) {

        onClickPost()
    } else {
        document.getElementById("error").innerText = "enter a title"
    }
};


function onClickPost() {
    fetch("/post", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            title: document.getElementById("titre").value,
            content: document.getElementById("content").value,
        })
    })
    .catch((err) => {
        document.getElementById("error").innerText = err.error

        })
    window.location.assign("/");

}
