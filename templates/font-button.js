function changeColor(color) { 
    document.body.style.background = color;
    document.body.style.color = "black"; 
    document.body.style.border = a;
    a = "border: 2px solid rgb(232, 232, 232);"
    // document.body.style.div.CreatePost = box-shadow;
    // "box-shadow" = "15px 10px 10px white"
}
function returnChangeColor(color) { 
    document.body.style.background = color;
    document.body.style.color = "white";
}

document.getElementById("fName").className = document.getElementById("fName").className + " error";  //this adds the error class

document.getElementById("fName").className = document.getElementById("fName").className.replace(" error", ""); //this removes the error class