package YnnitPackage

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

var users = []Users{}
var posts = []Post{}
var communauters = []Communauter{}
var comments = []Comment{}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Home!")
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(users)
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	for _, user := range users {
		if strconv.Itoa(user.Id) == id {
			json.NewEncoder(w).Encode(user)
		}
	}
}

func PostsHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(posts)
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	for _, post := range posts {
		if strconv.Itoa(post.Id) == id {
			json.NewEncoder(w).Encode(post)
		}
	}
}

func CommunautersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(communauters)
}

func CommunauterHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	for _, communauter := range communauters {
		if strconv.Itoa(communauter.Id) == id {
			json.NewEncoder(w).Encode(communauter)
		}
	}
}

func CommentsHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(comments)
}

func CommentHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	for _, comment := range comments {
		if strconv.Itoa(comment.Id) == id {
			json.NewEncoder(w).Encode(comment)
		}
	}
}

func Signin(w http.ResponseWriter, r *http.Request) {
	var templateshtml = template.Must(template.ParseGlob("./templates/*.html"))
	templateshtml.ExecuteTemplate(w, "Signin.html", 0)
}

func Profile(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Profile!")
}

func Joinus(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello JoinUs!")
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func Handler() {

	db := InitDatabase("./Ynnit.db")
	defer db.Close()
	// InsertIntoUsers(db, "jeinero", "jenei@gmail.com", "ImRio69")
	// UpdatePassUser(db, "PaseeeeeeeeeeeeeesChang", "bc@gmail.om")
	// UpdateMailUser(db, "azertyuiop@yahoo.ch", "jenei@gmail.com")
	// UpdateNameUser(db, "rio", "azertyuiop@yahoo.ch")
	// DeleteUser(db, "boc@gmail.com")
	users = DbtoStructUser(db)

	r := mux.NewRouter()

	r.Handle("/css/{rest}",
		http.StripPrefix("/css/", http.FileServer(http.Dir("./static"))))

	r.Handle("/js/{rest}",
		http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))

	r.HandleFunc("/", HomeHandler)

	r.HandleFunc("/apiusers", UsersHandler)
	r.HandleFunc("/apiusers/{id}", UserHandler)

	r.HandleFunc("/apipost", PostsHandler)
	r.HandleFunc("/apipost/{id}", PostHandler)

	r.HandleFunc("/apicommunauter", CommunautersHandler)
	r.HandleFunc("/apicommunauter/{id}", CommunauterHandler)

	r.HandleFunc("/apicomment", CommentsHandler)
	r.HandleFunc("/apicomment/{id}", CommentHandler)

	r.HandleFunc("/signin", Signin)

	r.HandleFunc("/joinus", Joinus)

	r.HandleFunc("/profile", Profile)

	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", r))
}
