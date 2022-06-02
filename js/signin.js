document.getElementById("signin").onclick = function() {
    fetch("/checksignin", {
        method: "POST", 
        headers: {
            "content-type": "application/json" 
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("pwd").value
        })
    })
}