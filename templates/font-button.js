function changeColor(color) { 
    document.body.style.background = color;
    document.body.style.color = "black";
    document.body.getElementsByClassName('CreatePost')[0].style.borderColor = "black";
}
function returnChangeColor(color) { 
    document.body.style.background = color;
    document.body.style.color = "white";
    document.body.getElementsByClassName('CreatePost')[0].style.borderColor = "white";
}
