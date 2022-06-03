package YnnitPackage

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"text/template"

	"github.com/gorilla/mux"
)

var AllApi AllStructs

type ApiPosts struct {
	Post     Post
	Comments []Comment
	like     int
}
type ApiUsers struct {
	User     User
	Post     []Post
	Comments []Comment
}
type ApiCommunauter struct {
	Communauter Communauter
	Post        []Post
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Home!")
}
func ApiAllHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi)
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.UsersAll)
}

func Checksignin(w http.ResponseWriter, r *http.Request) {
	var temptab User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &temptab)
	if UserExists(AllApi.db, temptab.Email, temptab.Password) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Your email or password was entered incorrectly\"}", http.StatusUnauthorized)
	}
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	vars := mux.Vars(r)
	id := vars["id"]
	var temptab ApiUsers
	for _, user := range AllApi.UsersAll {
		if strconv.Itoa(user.Id) == id {
			temptab.User = user
		}
	}
	for _, post := range AllApi.PostsAll {
		if strconv.Itoa(post.UsersID) == id {
			temptab.Post = append(temptab.Post, post)
		}
	}
	for _, comment := range AllApi.CommentsAll {
		if strconv.Itoa(comment.UsersID) == id {
			temptab.Comments = append(temptab.Comments, comment)
		}
	}
	json.NewEncoder(w).Encode(temptab)
}

func PostsHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.PostsAll)
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	vars := mux.Vars(r)
	id := vars["id"]
	var temptab ApiPosts
	for _, post := range AllApi.PostsAll {
		if strconv.Itoa(post.Id) == id {
			temptab.Post = post
		}
	}
	for _, comment := range AllApi.CommentsAll {
		if strconv.Itoa(comment.PostLink) == id {
			temptab.Comments = append(temptab.Comments, comment)
		}
	}
	idInt, _ := strconv.Atoi((id))
	temptab.like = countLike(AllApi.db, "likedpost", "postLike", idInt)
	json.NewEncoder(w).Encode(temptab)
}

func CommunautersHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.CommunautersAll)
}

func CommunauterHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	vars := mux.Vars(r)
	id := vars["id"]
	var temptab ApiCommunauter
	for _, communauter := range AllApi.CommunautersAll {
		if strconv.Itoa(communauter.Id) == id {
			temptab.Communauter = communauter
		}
	}
	for _, post := range AllApi.PostsAll {
		if strconv.Itoa(post.CommuLink) == id {
			temptab.Post = append(temptab.Post, post)
		}
	}
	json.NewEncoder(w).Encode(temptab)

}

func CommentsHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.CommentsAll)
}
func CommentHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	vars := mux.Vars(r)

	id := vars["id"]
	for _, comment := range AllApi.CommentsAll {
		if strconv.Itoa(comment.Id) == id {
			json.NewEncoder(w).Encode(comment)
		}
	}
}

func Home(w http.ResponseWriter, r *http.Request) {
	var templateshtml = template.Must(template.ParseGlob("./templates/*.html"))
	templateshtml.ExecuteTemplate(w, "home.html", 0)

}

func Signin(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/Signin.html")
}

func Profile(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Profile!")
}

func Joinus(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/joinus.html")
}

func Newuser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newUser)
	if InsertIntoUser(AllApi.db, newUser.Name, newUser.Email, newUser.Password) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a unique email and name\"}", http.StatusUnauthorized)
	}
}

func PostsPage(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/post.html")
}

func Posts(w http.ResponseWriter, r *http.Request) {
	var newPost Post
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newPost)
	goodOrFalse := InsertIntoPost(AllApi.db, newPost.Title, newPost.Content, 1, 2)
	if !goodOrFalse {
		w.Write([]byte("{\"error\": \"Sorry\"}"))
	}
}

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
	r.HandleFunc("/ ", ApiAllHandler)

	r.HandleFunc("/apiusers", UsersHandler)
	r.HandleFunc("/apiusers/{id}", UserHandler)
	r.HandleFunc("/checksignin", Checksignin)

	r.HandleFunc("/apiposts", PostsHandler)
	r.HandleFunc("/apiposts/{id}", PostHandler)

	r.HandleFunc("/apicommunauters", CommunautersHandler)
	r.HandleFunc("/apicommunauters/{id}", CommunauterHandler)

	r.HandleFunc("/apicomments", CommentsHandler)
	r.HandleFunc("/apicomments/{id}", CommentHandler)

	r.HandleFunc("/signin", Signin)

	r.HandleFunc("/joinus", Joinus)
	r.HandleFunc("/newuser", Newuser)

	r.HandleFunc("/profile", Profile)

	r.HandleFunc("/postpage", PostsPage)
	r.HandleFunc("/post", Posts)

	r.HandleFunc("/home", Home)

	reloadApi()
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", r))
}

// countLike(AllApi.db, "comment", "postLink", 1)
func reloadApi() {
	AllApi.UsersAll = DbtoStructUser(AllApi.db)
	AllApi.CommunautersAll = DbtoStructCommunauter(AllApi.db)
	AllApi.PostsAll = DbtoStructPost(AllApi.db)
	AllApi.CommentsAll = DbtoStructComment(AllApi.db)
}
