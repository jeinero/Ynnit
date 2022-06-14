function changeColor(color) { 
    document.body.style.background = color;
    document.body.style.color = "black";
    document.body.getElementsByClassName('CreatePost')[0].style.borderColor = "black";
    document.body.getElementsByTagName('textarea')[0].style.borderColor = "black";
    // document.body.getElementsById('#centerTop')[0].style.borderColor = "black";
    document.body.getElementsByClassName('box')[0].style.borderColor = "black";
    document.body.getElementsByClassName('box')[1].style.borderColor = "black";
}
function returnChangeColor(color) { 
    document.body.style.background = color;
    document.body.style.color = "white";
    document.body.getElementsByClassName('CreatePost')[0].style.borderColor = "white";
    // document.body.getElementsByTagName('textarea')[0].style.borderColor = "white";
    document.body.getElementsByClassName('box')[0].style.borderColor = "white";
    document.body.getElementsByClassName('box')[1].style.borderColor = "white";
}
