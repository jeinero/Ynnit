package YnnitPackage

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"text/template"

	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

var AllApi AllStruct

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
	var temptab AllStruct
	for _, user := range AllApi.UsersAll {
		if strconv.Itoa(user.Id) == id {
			temptab.UsersAll = append(temptab.UsersAll, user)
		}
	}
	for _, comment := range AllApi.CommentAll {
		if strconv.Itoa(comment.UsersID) == id {
			temptab.CommentAll = append(temptab.CommentAll, comment)
		}
	}
	json.NewEncoder(w).Encode(temptab)
}

func PostsHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(AllApi.PostAll)
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for _, post := range AllApi.PostAll {
		if strconv.Itoa(post.Id) == id {
			json.NewEncoder(w).Encode(post)
		}
	}
}

func CommunautersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(AllApi.CommunauterAll)
}

func CommunauterHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for _, communauter := range AllApi.CommunauterAll {
		if strconv.Itoa(communauter.Id) == id {
			json.NewEncoder(w).Encode(communauter)
		}
	}
}

func CommentsHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(AllApi.CommentAll)
}
func CommentHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	for _, comment := range AllApi.CommentAll {
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
	InsertIntoUsers(db, "qsdlqsd", "jeazenei@gmail.com", "ImRio69")
	InsertIntoUsers(db, "MARTINMATIN", "JsuisunePute@gmail.com", "ImRio69")
	InsertIntoCommunauter(db, "Golang")
	InsertIntoPost(db, 1, "Golang Basic", "Golang suck lmao", 3)
	InsertIntoComment(db, "Menteur", 2, 1)
	InsertIntoComment(db, "gros bouffon", 2, 1)
	// InsertIntoComment(db, "hihahmldDou", 2)
	// InsertIntoComment(db, "hidazdazhahou", 3)
	// InsertIntoComment(db, "hihazadazdhou", 3)
	// UpdatePassUser(db, "PaseeeeeeeeeeeeeesChang", "bc@gmail.om")
	// UpdateMailUser(db, "azertyuiop@yahoo.ch", "jenei@gmail.com")
	// UpdateNameUser(db, "rio", "azertyuiop@yahoo.ch")
	// DeleteUser(db, "boc@gmail.com")

	// users = DbtoStructUser(db)

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

	AllApi.UsersAll = DbtoStructUser(db)
	AllApi.CommunauterAll = DbtoStructCommunauter(db)
	AllApi.PostAll = DbtoStructPost(db)
	AllApi.CommentAll = DbtoStructComment(db)
	log.Fatal(http.ListenAndServe(":8080", r))
}
