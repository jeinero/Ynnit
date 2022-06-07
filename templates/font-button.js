function changeColor(color) { 
    document.body.style.background = color;
    document.body.style.color = "black"; 
    document.body.getElementsByClassName('CreatePost').style.borderColor= color;
}
function returnChangeColor(color) { 
    document.body.style.background = color;
    document.body.style.color = "white";
}
