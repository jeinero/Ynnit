package YnnitPackage

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

var AllApi AllStructs

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Home!")
}
func ApiAllHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(AllApi)
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(AllApi.UsersAll)
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var temptab AllStructs
	for _, user := range AllApi.UsersAll {
		if strconv.Itoa(user.Id) == id {
			temptab.UsersAll = append(temptab.UsersAll, user)
		}
	}
	for _, post := range AllApi.PostsAll {
		if strconv.Itoa(post.UsersID) == id {
			temptab.PostsAll = append(temptab.PostsAll, post)
		}
	}
	for _, comment := range AllApi.CommentsAll {
		if strconv.Itoa(comment.UsersID) == id {
			temptab.CommentsAll = append(temptab.CommentsAll, comment)
		}
	}
	json.NewEncoder(w).Encode(temptab)
}

func PostsHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(AllApi.PostsAll)
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var temptab AllStructs
	for _, post := range AllApi.PostsAll {
		if strconv.Itoa(post.Id) == id {
			temptab.PostsAll = append(temptab.PostsAll, post)
		}
	}
	for _, comment := range AllApi.CommentsAll {
		if strconv.Itoa(comment.PostLink) == id {
			temptab.CommentsAll = append(temptab.CommentsAll, comment)
		}
	}
	json.NewEncoder(w).Encode(temptab)
}

func CommunautersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(AllApi.CommunautersAll)
}

func CommunauterHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var temptab AllStructs
	for _, communauter := range AllApi.CommunautersAll {
		if strconv.Itoa(communauter.Id) == id {
			temptab.CommunautersAll = append(temptab.CommunautersAll, communauter)
		}
	}
	for _, post := range AllApi.PostsAll {
		if strconv.Itoa(post.CommuLink) == id {
			temptab.PostsAll = append(temptab.PostsAll, post)
		}
	}
	json.NewEncoder(w).Encode(temptab)

}

func CommentsHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(AllApi.CommentsAll)
}
func CommentHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	for _, comment := range AllApi.CommentsAll {
		if strconv.Itoa(comment.Id) == id {
			json.NewEncoder(w).Encode(comment)
		}
	}
}

func Signin(w http.ResponseWriter, r *http.Request) {
	// var templateshtml = template.Must(template.ParseGlob("./templates/*.html"))
	// templateshtml.ExecuteTemplate(w, "Signin.html", 0)
}

func Profile(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Profile!")
}

func Joinus(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Join Us!")
}

func Createcommunity(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/communityCreate.html")
}

/*
func connect(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/connect.html")
}
func register(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/register.html")
}
*/

func Handler() {

	db := InitDatabase("./Ynnit.db")
	AllApi.db = db
	defer db.Close()
	// InsertIntoUser(db, "jeinero", "jenei@gmail.com", "ImRio6988")
	// InsertIntoUser(db, "qsdlqsd", "jeazenei@yahoo.fr", "ImRio6988")
	// InsertIntoCommunauter(db, "Golang")
	// InsertIntoPost(db, 1, "Golang Basic", "Golang suck lmao", 2)
	// InsertIntoComment(db, "Menteur", 1, 1)
	// InsertIntoComment(db, "gros bouffon", 1, 1)
	// UpdatePassUser(db, "PaseeeeeeeeeeeeeesChang", "bc@gmail.om")
	// UpdateMailUser(db, "azertyuiop@yahoo.ch", "jenei@gmail.com")
	// UpdateNameUser(db, "rio", "azertyuiop@yahoo.ch")
	// DeleteUser(db, "boc@gmail.com")

	r := mux.NewRouter()

	r.Handle("/css/{rest}",
		http.StripPrefix("/css/", http.FileServer(http.Dir("./static"))))

	r.Handle("/js/{rest}",
		http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))

	r.HandleFunc("/", HomeHandler)

	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/apiall", ApiAllHandler)

	r.HandleFunc("/apiusers", UsersHandler)
	r.HandleFunc("/apiusers/{id}", UserHandler)

	r.HandleFunc("/apiposts", PostsHandler)
	r.HandleFunc("/apiposts/{id}", PostHandler)

	r.HandleFunc("/apicommunauters", CommunautersHandler)
	r.HandleFunc("/apicommunauters/{id}", CommunauterHandler)

	r.HandleFunc("/apicomments", CommentsHandler)
	r.HandleFunc("/apicomments/{id}", CommentHandler)

	r.HandleFunc("/signin", Signin)

	r.HandleFunc("/joinus", Joinus)

	r.HandleFunc("/profile", Profile)

	r.HandleFunc("/createcommunity", Createcommunity)

	/*
		r.HandleFunc("/connect", connect)

		r.HandleFunc("/register", register)
	*/
	http.Handle("/", r)

	AllApi.UsersAll = DbtoStructUser(db)
	AllApi.CommunautersAll = DbtoStructCommunauter(db)
	AllApi.PostsAll = DbtoStructPost(db)
	AllApi.CommentsAll = DbtoStructComment(db)
	log.Fatal(http.ListenAndServe(":8080", r))
}
