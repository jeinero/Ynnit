package YnnitPackage

import "database/sql"

type AllStruct struct {
	db             *sql.DB
	UsersAll       []Users
	CommunauterAll []Communauter
	PostAll        []Post
	CommentAll     []Comment
}

type Users struct {
	Id       int    `json: "id"`
	Name     string `json: "name"`
	Email    string `json: "email"`
	Password string `json: "password"`
}
type Communauter struct {
	Id   int    `json: "id"`
	Name string `json: "name"`
}
type Post struct {
	Id        int    `json: "id"`
	CommuLink int    `json: "commuLink"`
	Titlte    string `json: "title"`
	Content   string `json: "email"`
	UsersID   int    `json: "idUser"`
}
type Comment struct {
	Id       int    `json: "id"`
	Content  string `json: "email"`
	PostLink int    `json: "postLink"`
	UsersID  int    `json: "idUser"`
}
