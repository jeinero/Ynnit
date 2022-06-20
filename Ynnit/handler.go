package YnnitPackage

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

var (
	key   = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)
var AllApi AllStructs

type ApiPosts struct {
	Post     Post
	Comments []Comment
	Warn     []Warn
	like     int
}

type ApiComments struct {
	Comments Comment
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

type ApiTags struct {
	Tags Tags
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	http.ServeFile(w, r, "./templates/home.html")
}

func CommunityHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	http.ServeFile(w, r, "./templates/community.html")
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
	reloadApi()
	var temptab User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &temptab)
	var names, ids = UserExists(AllApi.db, temptab.Email, temptab.Password)
	if names != "" && ids != 0 {
		name, id := UserExists(AllApi.db, temptab.Email, temptab.Password)
		status := Leveluser(AllApi.db, id)
		w.Write([]byte("{\"msgname\": \"" + name + "\", \"msgid\": \"" + strconv.Itoa(id) + "\", \"msgstatus\": \"" + status + "\"}"))
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
		if post.UsersName == temptab.User.Name {
			temptab.Post = append(temptab.Post, post)
		}
	}
	for _, comment := range AllApi.CommentsAll {
		if comment.UsersName == temptab.User.Name {
			temptab.Comments = append(temptab.Comments, comment)
		}
	}
	json.NewEncoder(w).Encode(temptab)
}

func PostsHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	var temptab []Post
	for _, post := range AllApi.PostsAll {
		for _, warn := range AllApi.WarnPost {
			if post.Id == warn.Link {
				post.Warn = append(post.Warn, warn)
			}
		}
		temptab = append(temptab, post)
	}
	AllApi.PostsAll = temptab
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

func tagsHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.TagsAll)
}

func CommentsHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.CommentsAll)
}
func CommentHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	vars := mux.Vars(r)
	var temptab ApiComments
	id := vars["id"]
	for _, comment := range AllApi.CommentsAll {
		if strconv.Itoa(comment.Id) == id {
			temptab.Comments = comment
		}
	}
	idInt, _ := strconv.Atoi((id))
	temptab.like = countLike(AllApi.db, "likedcomment", "commentLike", idInt)
	json.NewEncoder(w).Encode(temptab)
}

func Signin(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	http.ServeFile(w, r, "./templates/Signin.html")
}

func Profile(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	session, _ := store.Get(r, "cookie-name")
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		http.Error(w, "Please login", http.StatusUnauthorized)
		return
	}

	t, _ := template.ParseFiles("./templates/profile.html")
	t.Execute(w, nil)
	reloadApi()
}

func Joinus(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	http.ServeFile(w, r, "./templates/joinus.html")
}

func ViewPost(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	http.ServeFile(w, r, "./templates/viewpost.html")
}

func ViewCommunity(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	http.ServeFile(w, r, "./templates/viewcommunity.html")
}
func Comments(w http.ResponseWriter, r *http.Request) {
	var newComments Comment

	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newComments)
	goodOrFalse := InsertIntoComment(AllApi.db, newComments.Content, newComments.UsersName, newComments.PostLink, newComments.Date)
	w.Write([]byte("{\"msg\": \"Success\"}"))
	if !goodOrFalse {
		w.Write([]byte("{\"error\": \"Sorry\"}"))
	}
}

func Newuser(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	var newUser User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newUser)
	if InsertIntoUser(AllApi.db, newUser.Name, newUser.Email, newUser.Password, "You can change the desc", "Users", newUser.Date) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a unique email and name\"}", http.StatusUnauthorized)
	}
}

func PostsPage(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	http.ServeFile(w, r, "./templates/post.html")
}

func Posts(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	var newPost Post
	body, _ := ioutil.ReadAll(r.Body)
	fmt.Println(string(body))
	json.Unmarshal(body, &newPost)
	goodOrFalse := InsertIntoPost(AllApi.db, newPost.CommuLink, newPost.Title, newPost.Content, newPost.UsersName, newPost.Date)
	if !goodOrFalse {
		w.Write([]byte("{\"error\": \"Sorry\"}"))
	}
}

func Session(w http.ResponseWriter, r *http.Request) {

	names := r.URL.Query()["name"]
	name := names[0]

	ids := r.URL.Query()["id"]
	id := ids[0]

	status := r.URL.Query()["status"]
	statu := status[0]

	n := http.Cookie{
		Name:  "name",
		Value: "" + name}
	http.SetCookie(w, &n)

	i := http.Cookie{
		Name:  "id",
		Value: "" + id}
	http.SetCookie(w, &i)

	s := http.Cookie{
		Name:  "status",
		Value: "" + statu}
	http.SetCookie(w, &s)

	session, _ := store.Get(r, "cookie-name")
	session.Values["authenticated"] = true
	session.Save(r, w)
	http.Redirect(w, r, "/profile", http.StatusFound)
}

func Logout(w http.ResponseWriter, r *http.Request) {

	n, err := r.Cookie("name")
	i, err := r.Cookie("id")
	s, err := r.Cookie("status")
	if err != nil {
		fmt.Println(err)
	}

	n.MaxAge = -1
	i.MaxAge = -1
	s.MaxAge = -1
	http.SetCookie(w, n)
	http.SetCookie(w, i)
	http.SetCookie(w, s)

	session, _ := store.Get(r, "cookie-name")

	session.Values["authenticated"] = false
	session.Save(r, w)

	http.Redirect(w, r, "/", http.StatusFound)
}

func NewcommunityHandler(w http.ResponseWriter, r *http.Request) {
	var Newcommunauter Communauter
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &Newcommunauter)
	fmt.Println(string(body))
	if InsertIntoCommunauter(AllApi.db, Newcommunauter.Name, Newcommunauter.Desc, Newcommunauter.Date, Newcommunauter.Tags) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a valide community\"}", http.StatusUnauthorized)
	}
}

func Changeemail(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/changeemail.html")
}

func Checkemail(w http.ResponseWriter, r *http.Request) {
	var newEmail User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newEmail)
	if UpdateMailUser(AllApi.db, newEmail.Id, newEmail.Email) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a valide name\"}", http.StatusUnauthorized)
	}
}

func Changedesc(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/changedesc.html")
}

func Checkdesc(w http.ResponseWriter, r *http.Request) {
	var newDesc User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newDesc)
	if UpdateDescUser(AllApi.db, newDesc.Id, newDesc.Desc) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a valide name\"}", http.StatusUnauthorized)
	}
}

func Changepass(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/changepass.html")
}

func Checkpass(w http.ResponseWriter, r *http.Request) {
	var newPass User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newPass)
	if UpdatePassUser(AllApi.db, newPass.Id, newPass.Password) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a valide name\"}", http.StatusUnauthorized)
	}
}

func Delete(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./templates/delete.html")
}

func Checkdelete(w http.ResponseWriter, r *http.Request) {
	var deleuser User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &deleuser)
	if DeleteUser(AllApi.db, deleuser.Id, deleuser.Name) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a valide name\"}", http.StatusUnauthorized)
	}
}

func Admin(w http.ResponseWriter, r *http.Request) {
	s, err := r.Cookie("status")
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	} else {
		value := s.Value
		if value == "Administrators" {
			t, _ := template.ParseFiles("./templates/admin.html")
			t.Execute(w, nil)
			reloadApi()
		} else {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		}
	}
}

func Changelevel(w http.ResponseWriter, r *http.Request) {
	var newuserlevel User
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newuserlevel)
	if Changeleveluser(AllApi.db, newuserlevel.Name, newuserlevel.UsersLevel) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a valide name\"}", http.StatusUnauthorized)
	}
}

func AddLikePost(w http.ResponseWriter, r *http.Request) {
	type like struct {
		PostLink int
		UsersId  int
	}
	var newLike like
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newLike)
	goodOrFalse := InsertIntoLikePost(AllApi.db, newLike.UsersId, newLike.PostLink)
	w.Write([]byte("{\"msg\": \"Success\"}"))
	if !goodOrFalse {
		w.Write([]byte("{\"error\": \"Sorry\"}"))
	}
}

func likesHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.LikeAll)
}
func likeHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	vars := mux.Vars(r)
	id := vars["userId"]
	for _, like := range AllApi.LikeAll {
		if strconv.Itoa(like.UserId) == id {
			json.NewEncoder(w).Encode(like)
		}
	}
}
func likesCommentsHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.LikeAllComment)
}
func likesCommentHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	vars := mux.Vars(r)
	id := vars["userId"]
	var temptab []Like
	for _, like := range AllApi.LikeAllComment {
		if strconv.Itoa(like.UserId) == id {
			temptab = append(temptab, like)
		}
	}
	json.NewEncoder(w).Encode(temptab)
}
func AddDislikePost(w http.ResponseWriter, r *http.Request) {
	type like struct {
		PostLink int
		UsersId  int
	}
	var newLike like
	body, _ := ioutil.ReadAll(r.Body)
	fmt.Println(string(body))
	json.Unmarshal(body, &newLike)
	goodOrFalse := InsertIntoDisLikePost(AllApi.db, newLike.UsersId, newLike.PostLink)
	w.Write([]byte("{\"msg\": \"Success\"}"))
	if !goodOrFalse {
		w.Write([]byte("{\"error\": \"Sorry\"}"))
	}
}

func DislikesHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.DislikeALl)
}
func DislikeHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	var temptab []DisLike
	vars := mux.Vars(r)
	id := vars["userId"]
	for _, dislike := range AllApi.DislikeALl {
		if strconv.Itoa(dislike.UserId) == id {
			temptab = append(temptab, dislike)
		}
	}
	json.NewEncoder(w).Encode(temptab)
}
func DislikesCommentsHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.DislikeALlComment)
}
func DislikeCommentHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	var temptab []DisLike
	vars := mux.Vars(r)
	id := vars["userId"]
	for _, dislike := range AllApi.DislikeALlComment {
		if strconv.Itoa(dislike.UserId) == id {
			temptab = append(temptab, dislike)
		}
	}
	json.NewEncoder(w).Encode(temptab)
}

func Deletecomme(w http.ResponseWriter, r *http.Request) {
	var deletecomme Comment
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &deletecomme)
	if DeleteCom(AllApi.db, deletecomme.Id) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a valide name\"}", http.StatusUnauthorized)
	}
}
func Deletepost(w http.ResponseWriter, r *http.Request) {
	var deletepost Post
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &deletepost)
	if DeletePost(AllApi.db, deletepost.Id) {
		w.Write([]byte("{\"msg\": \"Success\"}"))
	} else {
		http.Error(w, "{\"error\": \"Enter a valide name\"}", http.StatusUnauthorized)
	}
}

func AddLikeComment(w http.ResponseWriter, r *http.Request) {
	type like struct {
		CommentLink int
		UsersId     int
	}
	var newLike like
	body, _ := ioutil.ReadAll(r.Body)
	fmt.Println(string(body))
	json.Unmarshal(body, &newLike)
	fmt.Println(newLike)
	goodOrFalse := InsertIntoLikeComment(AllApi.db, newLike.UsersId, newLike.CommentLink)
	w.Write([]byte("{\"msg\": \"Success\"}"))
	if !goodOrFalse {
		w.Write([]byte("{\"error\": \"Sorry\"}"))
	}
}

func AddDislikeComment(w http.ResponseWriter, r *http.Request) {
	type like struct {
		CommentLink int
		UsersId     int
	}
	var newLike like
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &newLike)
	goodOrFalse := InsertIntoDisLikeComment(AllApi.db, newLike.UsersId, newLike.CommentLink)
	w.Write([]byte("{\"msg\": \"Success\"}"))
	if !goodOrFalse {
		w.Write([]byte("{\"error\": \"Sorry\"}"))
	}
}

func CategoriesHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	json.NewEncoder(w).Encode(AllApi.TagsAll)
}

func CategorieHandler(w http.ResponseWriter, r *http.Request) {
	reloadApi()
	vars := mux.Vars(r)
	id := vars["id"]
	var temptab ApiTags
	for _, tags := range AllApi.TagsAll {
		if strconv.Itoa(tags.Id) == id {
			temptab.Tags = tags
		}
	}
	json.NewEncoder(w).Encode(temptab)
}

func AddWarnPost(w http.ResponseWriter, r *http.Request) {
	var warn Warn
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &warn)
	fmt.Println(string(body))
	goodOrFalse := InsertIntoWarnPost(AllApi.db, warn.Content, warn.Link)
	w.Write([]byte("{\"msg\": \"Success\"}"))
	if !goodOrFalse {
		w.Write([]byte("{\"error\": \"Sorry\"}"))
	}
}

func Handler() {

	db := InitDatabase("./Ynnit.db")
	AllApi.db = db
	defer db.Close()

	// InsertIntoCategorie(AllApi.db, "Informatique")
	// InsertIntoCategorie(AllApi.db, "France")
	// InsertIntoCategorie(AllApi.db, "Food")
	Changeleveluser(AllApi.db, "Zupz", "Administrators")
	// InsertIntoUser(db, "jeinero", "jenei@gmail.com", "ImRio6988", "guest", "test", "test")
	InsertIntoCategorie(AllApi.db, "Shitpost")
	// InsertIntoUser(db, "qsdlqsd", "jeazenei@yahoo.fr", "ImRio6988")
	// InsertIntoCommunauter(db, "InfoFams", "DESC")
	// InsertIntoPost(db, 1, "Golang Basic", "Golang suck lmao", "Zupz", 1)
	// InsertIntoComment(db, "Menteur", 1, 1)
	// InsertIntoComment(db, "gros bouffon", 1, 1)
	// UpdatePassUser(db, "PaseeeeeeeeeeeeeesChang", "bc@gmail.om")
	// UpdateMailUser(db, "azertyuiop@yahoo.ch", "jenei@gmail.com")
	// UpdateNameUser(db, 1, "test2")
	// DeleteUser(AllApi.db, 2, "test")

	r := mux.NewRouter()

	r.Handle("/css/{rest}",
		http.StripPrefix("/css/", http.FileServer(http.Dir("./static"))))

	r.Handle("/js/{rest}",
		http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))

	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/apiall", ApiAllHandler)

	r.HandleFunc("/apiusers", UsersHandler)
	r.HandleFunc("/apiusers/{id}", UserHandler)
	r.HandleFunc("/checksignin", Checksignin)

	r.HandleFunc("/apiposts", PostsHandler)
	r.HandleFunc("/apiposts/{id}", PostHandler)

	r.HandleFunc("/apicommunauters", CommunautersHandler)
	r.HandleFunc("/apicommunauters/{id}", CommunauterHandler)

	r.HandleFunc("/apitags", tagsHandler)

	r.HandleFunc("/apicomments", CommentsHandler)
	r.HandleFunc("/apicomments/{id}", CommentHandler)

	r.HandleFunc("/apilike", likesHandler)
	r.HandleFunc("/apilike/{userId}", likesHandler)

	r.HandleFunc("/apidislike", DislikesHandler)
	r.HandleFunc("/apidislike/{userId}", DislikeHandler)

	r.HandleFunc("/apilikecomment", likesCommentsHandler)
	r.HandleFunc("/apilikecomment/{userId}", likesCommentHandler)

	r.HandleFunc("/apidislikecomment", DislikesCommentsHandler)
	r.HandleFunc("/apidislikecomment/{userId}", DislikeCommentHandler)

	r.HandleFunc("/apicategories", CategoriesHandler)
	r.HandleFunc("/apicategories/{id}", CategorieHandler)

	r.HandleFunc("/signin", Signin)

	r.HandleFunc("/joinus", Joinus)
	r.HandleFunc("/newuser", Newuser)

	r.HandleFunc("/profile", Profile)

	r.HandleFunc("/admin", Admin)
	r.HandleFunc("/changelevel", Changelevel)

	r.HandleFunc("/changeemail", Changeemail)
	r.HandleFunc("/checkemail", Checkemail)

	r.HandleFunc("/changedesc", Changedesc)
	r.HandleFunc("/checkdesc", Checkdesc)

	r.HandleFunc("/changepass", Changepass)
	r.HandleFunc("/checkpass", Checkpass)

	r.HandleFunc("/delete", Delete)
	r.HandleFunc("/checkdelete", Checkdelete)

	r.HandleFunc("/community", CommunityHandler)
	r.HandleFunc("/newcommunity", NewcommunityHandler)

	r.HandleFunc("/postpage", PostsPage)
	r.HandleFunc("/post", Posts)

	r.HandleFunc("/viewpost", ViewPost)
	r.HandleFunc("/comment", Comments)

	r.HandleFunc("/addLikepost", AddLikePost)
	r.HandleFunc("/addDislikepost", AddDislikePost)

	r.HandleFunc("/addLikecomment", AddLikeComment)
	r.HandleFunc("/addDislikecomment", AddDislikeComment)

	r.HandleFunc("/deletepost", Deletepost)
	r.HandleFunc("/deletecomme", Deletecomme)

	r.HandleFunc("/session", Session)

	r.HandleFunc("/logout", Logout)

	r.HandleFunc("/addWarnPost", AddWarnPost)

	r.HandleFunc("/viewcommunity", ViewCommunity)
	go reloadApi()

	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", r))
}

// countLike(AllApi.db, "comment", "postLink", 1)
func reloadApi() {
	AllApi.UsersAll = DbtoStructUser(AllApi.db)
	AllApi.CommunautersAll = DbtoStructCommunauter(AllApi.db)
	AllApi.PostsAll = DbtoStructPost(AllApi.db)
	AllApi.CommentsAll = DbtoStructComment(AllApi.db)
	AllApi.TagsAll = DbtoStructCategorie(AllApi.db)
	AllApi.LikeAll = DbtoStructLikePost(AllApi.db)
	AllApi.DislikeALl = DbtoStructDisLikePost(AllApi.db)
	AllApi.LikeAllComment = DbtoStructLikeComment(AllApi.db)
	AllApi.DislikeALlComment = DbtoStructDisLikeComment(AllApi.db)
	AllApi.WarnPost = DbtoStructWarnPost(AllApi.db)

}
