let thead = document.createElement("thead");

let tr = document.createElement("tr");

let thName = document.createElement("th");
thName.innerText = "Name"
tr.appendChild(thName);

let thUserslevel = document.createElement("th");
thUserslevel.innerText = "Users Level"
tr.appendChild(thUserslevel);

let thChangelevel = document.createElement("th");
thChangelevel.innerText = "Change Level"
tr.appendChild(thChangelevel);

thead.appendChild(tr);
tableId.appendChild(thead);

const loadDataUser = data => {

    let tabTab = [...document.getElementsByClassName("tablinks")]

    tabTab.forEach(element => {
        element.onclick  = function() {
            let tab = element.innerText
            let button = element
            Tab(tab, button)
        }
    })


    array(data)

    document.getElementById("site-search").oninput  = function() {Search(this.value, data)}

    let tabbutton = [...document.getElementsByClassName("changelevel")]

    let index = 0
    tabbutton.forEach(element => {
        let name = document.getElementsByClassName("name")[index].innerText
        let valu = document.getElementsByClassName("select")[index]
        element.onclick = function(){
            changelevel(valu.value, name)
        }
        index = index + 1
    })
    document.getElementById("defaultOpen").click();
}

function Tab(tab, button) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(tab).style.display = "block";
    button.className += " active";
  }

function array(api) {
    let tbody = document.createElement("tbody");

    api.forEach(element => {

        let tr = document.createElement("tr");

        let tdName = document.createElement("td");
        tdName.className = "name"
        tdName.innerText = element.Name
        tr.appendChild(tdName);

        let tdUserslevel = document.createElement("td");
        tdUserslevel.innerText = element.UsersLevel
        tr.appendChild(tdUserslevel);

        let tdSelect = document.createElement("td");
        let select = document.createElement("SELECT");
        select.className = "select"
        tdSelect.appendChild(select)
        tr.appendChild(tdSelect);

        let optionAdministrators = document.createElement("option");
        optionAdministrators.setAttribute("value", "Administrators");
        optionAdministrators.innerText = "Administrators"
        select.appendChild(optionAdministrators)

        let optionModerators = document.createElement("option");
        optionModerators.setAttribute("value", "Moderators");
        optionModerators.innerText = "Moderators"
        select.appendChild(optionModerators)

        let optionUsers = document.createElement("option");
        optionUsers.setAttribute("value", "Users");
        optionUsers.innerText = "Users"
        select.appendChild(optionUsers)

        let button = document.createElement("button");
        button.className = "changelevel"
        button.innerText = "Change"
        tdSelect.appendChild(button)

        tbody.appendChild(tr);
        tableId.appendChild(tbody);

        let index = ""

        if (element.UsersLevel == "Administrators") {
            index += 0
        } else if (element.UsersLevel == "Moderators") {
            index += 1
        } else {
            index += 2
        }

        select.selectedIndex = index;
    });
}

function Search(value, api) {
    let tabSearch = []
    api.forEach(element => {
        if (element.Name.toLowerCase().includes(value.toLowerCase())) {
            tabSearch.push(element)
        }
    });
    document.getElementsByTagName("tbody")[0].remove();
    array(tabSearch)
}

function changelevel(value, names) {
    fetch("/changelevel", {
        method: "POST", 
        headers: {
            "content-type": "application/json" 
        },
        body: JSON.stringify({
            name: names,
            UsersLevel: value
        })
    })
    .then(async (res) => {
        if (!res.ok)
            throw await res.json()
        return res.json()
    })
    .then((data) => {
        location.href = "/admin"
    }).catch((err) => {
        // document.getElementById("error").innerText = err.error
    })
}

 fetch("/apiusers")
.then(resp => resp.json())
.then(loadDataUser)