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
        element.onclick = function () {
            let tab = element.innerText
            let button = element
            Tab(tab, button)
        }
    })


    array(data)

    document.getElementById("site-search").oninput = function () { Search(this.value, data) }

    let tabbutton = [...document.getElementsByClassName("changelevel")]

    let index = 0
    tabbutton.forEach(element => {
        let name = document.getElementsByClassName("name")[index].innerText
        let valu = document.getElementsByClassName("select")[index]
        element.onclick = function () {
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

let theadreport = document.createElement("thead");

let trreport = document.createElement("tr");

let thUsername = document.createElement("th");
thUsername.innerText = "Name User Report"
trreport.appendChild(thUsername);

let thDetails = document.createElement("th");
thDetails.innerText = "Comment Report"
trreport.appendChild(thDetails);

let thPost = document.createElement("th");
thPost.innerText = "Post report"
trreport.appendChild(thPost);

let thComfirm = document.createElement("th");
thComfirm.innerText = "Comfirm"
trreport.appendChild(thComfirm);

theadreport.appendChild(trreport);
tableReport.appendChild(theadreport);

const loadDataReport = data => {

    let tabTab = [...document.getElementsByClassName("tablinks")]

    tabTab.forEach(element => {
        element.onclick = function () {
            let tab = element.innerText
            let button = element
            Tab(tab, button)
        }
    })


    arrayreport(data)

    let buttonyes = [...document.getElementsByClassName("yes")]
    let buttonno = [...document.getElementsByClassName("no")]

    buttonyes.forEach(element => {
        element.onclick = function () { ConfirmYes(element) }
    })

    buttonno.forEach(element => {
        element.onclick = function () { ConfirmNo(element) }
    })

}



function arrayreport(api) {
    let tbodyreport = document.createElement("tbody");

    api.forEach(element => {
        if (element.Warn != null) {


            let treport = document.createElement("tr");
            treport.id = element.Id

            let tduser = document.createElement("td");
            tduser.className = "user"
            tduser.innerText = element.UsersName
            treport.appendChild(tduser);

            let tdcommentreport = document.createElement("td");
            element.Warn.forEach(element => {
                tdcommentreport.innerText = element.Content
            });
            treport.appendChild(tdcommentreport);

            let tdpost = document.createElement("td");
            tdpost.innerText = element.Content
            treport.appendChild(tdpost);

            let tdcomfirm = document.createElement("td");
            let tdyes = document.createElement("button");
            let tdno = document.createElement("button");
            tdyes.innerText = "yes"
            tdyes.className = "yes"
            tdyes.id = element.Id

            tdno.innerText = "no"
            tdno.className = "no"
            tdno.id = element.Id

            treport.appendChild(tdcomfirm);
            tdcomfirm.appendChild(tdyes)
            tdcomfirm.appendChild(tdno)


            tbodyreport.appendChild(treport);
            tableReport.appendChild(tbodyreport);
        }

    });
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

let id = getCookie("id")

function ConfirmYes(value) {
    fetch("/addWarnUser", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            Content: "",
            Link: parseInt(id)
        })
    })
        .then(async (res) => {
            if (!res.ok)
                throw await res.json()
            return res.json()
        })
        .then((data) => {
        }).catch((err) => {
            // document.getElementById("error").innerText = err.error
        })
    ConfirmNo(value)
}

function ConfirmNo(value) {
    fetch("/delWarnPost", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            Id: parseInt(value.id)
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

fetch("/apiposts")
    .then(resp => resp.json())
    .then(loadDataReport)


let theadtags = document.createElement("thead");

let trtags = document.createElement("tr");

let thTags = document.createElement("th");
thTags.innerText = "Tags"
trtags.appendChild(thTags);

theadtags.appendChild(trtags);
tableTags.appendChild(theadtags);



const loadDataTags = data => {

    let tabTab = [...document.getElementsByClassName("tablinks")]

    tabTab.forEach(element => {
        element.onclick = function () {
            let tab = element.innerText
            let button = element
            Tab(tab, button)
        }
    })


    arraytags(data)

    document.getElementById("search-tags").oninput = function () { Searchtags(this.value, data) }

    document.getElementById("add").onclick = function () { AddTags(document.getElementById("addtags").value) }

}

function arraytags(api) {
    let tbodytags = document.createElement("tbody");

    api.forEach(element => {

        let trtags = document.createElement("tr");

        let tdtags = document.createElement("td");
        tdtags.className = "tagsname"
        tdtags.innerText = element.Name
        trtags.appendChild(tdtags);

        tbodytags.appendChild(trtags);
        tableTags.appendChild(tbodytags);

    });
}

function Searchtags(value, api) {
    let tabSearch = []
    api.forEach(element => {
        if (element.Name.toLowerCase().includes(value.toLowerCase())) {
            tabSearch.push(element)
        }
    });
    document.getElementsByTagName("tbody")[2].remove();
    arraytags(tabSearch)
}

function AddTags(name) {
    if (name.length >= 1) {
        fetch("/addtags", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Name: name,
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
        document.getElementById("addtags").value = ""
        document.getElementById("error").innerText = ""
    } else {
        document.getElementById("error").innerText = "enter valide name"
    }
}


fetch("/apitags")
    .then(resp => resp.json())
    .then(loadDataTags)



let theadflags = document.createElement("thead");

let trflags = document.createElement("tr");

let thUser = document.createElement("th");
thUser.innerText = "User"
trflags.appendChild(thUser);

let thFlags = document.createElement("th");
thFlags.innerText = "Flags"
trflags.appendChild(thFlags);

let thdel = document.createElement("th");
thdel.innerText = "del user"
trflags.appendChild(thdel);

theadflags.appendChild(trflags);
tableFlags.appendChild(theadflags);

const loadDataFlags = data => {
    arrayflags(data)

    document.getElementById("deluser").onclick = function () { deluser() }

}

function arrayflags(api) {
    let tbodyflags = document.createElement("tbody");

    api.forEach(element => {
        if (element.Warns != null) {

            let trflags = document.createElement("tr");

            let tduser = document.createElement("td");
            tduser.innerText = element.Name
            trflags.appendChild(tduser);

            let tdflags = document.createElement("td");
            let count = 0
            element.Warns.forEach(element => {
                let i = 1
                count = count + i
            })

            tdflags.innerText = count
            trflags.appendChild(tdflags);

            let tddelete = document.createElement("td");
            let tddel = document.createElement("button");
            tddel.innerText = "del user"
            tddel.id = 'deluser'

            trflags.appendChild(tddelete);
            tddelete.appendChild(tddel)

            tbodyflags.appendChild(trflags);
            tableFlags.appendChild(tbodyflags);
        }
    })
}

let ids = getCookie("id")
let names = getCookie("name")

function deluser() {
    fetch("/checkdelete", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            id: parseInt(ids),
            name: names
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
    .then(loadDataFlags)